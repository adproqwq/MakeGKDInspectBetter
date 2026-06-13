import { dialog, alert } from 'mdui';
import { getSnapshotZip } from './indexedDB';
import getSnapshotId from './getSnapshotId';
import type {
  IGithubDeviceFlowLogin,
  IGithubDeviceFlowAccessToken,
  IGithubUploadPolicy,
} from '../types/github';

export class GitHubDeviceAuth {
  clientId: string;
  token = '';
  proxyUrl = 'https://proxy.adpro-qwq.workers.dev';
  apiUrl = 'https://api.github.com';

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  // 步骤 1：请求设备码
  async startAuth() {
    const response = await fetch(`${this.proxyUrl}/github/device`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.clientId,
        scope: 'repo public_repo',
      }),
    });

    const data: IGithubDeviceFlowLogin = await response.json();
    // data.device_code, data.user_code, data.verification_uri, data.expires_in, data.interval

    // 显示给用户：请在浏览器打开 verification_uri，输入 user_code
    dialog({
      headline: 'Github 授权',
      description: `请在打开的页面中输入: ${data.user_code}`,
      closeOnEsc: true,
      closeOnOverlayClick: true,
      actions: [
        {
          text: '取消',
        },
        {
          text: '打开验证页面',
          onClick: () => {
            window.open(data.verification_uri);
          },
        },
      ],
    });

    this.token = await this.pollForToken(data.device_code, data.interval);

    return this.token;
  }

  // 步骤 2：轮询获取 access_token
  async pollForToken(deviceCode: string, interval: number) {
    const maxAttempts = 100; // 约 15 分钟

    for (let i = 0; i < maxAttempts; i++) {
      await this.sleep(interval * 1000);

      const response = await fetch(`${this.proxyUrl}/github/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.clientId,
          device_code: deviceCode,
          grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
        }),
      });

      const data: IGithubDeviceFlowAccessToken = await response.json();

      if (data.access_token) return data.access_token;

      if (data.error === 'authorization_pending') {
        continue; // 用户还未授权
      }

      if (data.error === 'slow_down') {
        interval++; // 降低轮询频率
      }

      if (data.error === 'expired_token') {
        throw new Error('设备码已过期');
      }

      if (data.error) {
        throw new Error(data.error_description || data.error);
      }
    }

    throw new Error('授权超时');
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // 获取上传策略
  async getUploadPolicy(file: File): Promise<IGithubUploadPolicy> {
    const res = await fetch(`${this.proxyUrl}/github/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/vnd.github.v3+json',
        'GitHub-Verified-Fetch': 'true',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0',
        origin: 'https://github.com',
        referer: 'https://github.com/',
      },
      body: JSON.stringify({
        name: file.name,
        size: file.size,
        content_type: file.type || 'application/octet-stream',
        repository_id: 661952005,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`获取上传策略失败: ${err}`);
    }

    return res.json();
  }

  // 上传到 S3（根据 policy）
  async uploadToS3(file: File, policy: IGithubUploadPolicy): Promise<void> {
    const formData = new FormData();

    // 按顺序添加 policy 中的字段
    Object.entries(policy.form_data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // 最后添加文件
    formData.append('file', file);

    const res = await fetch(policy.upload_url, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`上传失败: ${res.status}`);
    }
  }

  // 完整上传流程
  async uploadFile(file: File) {
    if (!this.token) await this.startAuth();

    const policy = await this.getUploadPolicy(file);
    await this.uploadToS3(file, policy);

    return {
      id: policy.id || policy.asset_upload_id,
      url: policy.asset_url,
    };
  }
}

const auth = new GitHubDeviceAuth('Ov23lilAqTU5QxPHxvq6');

export default async () => {
  try {
    // 1. 登录（会弹出设备码让用户确认）
    await auth.startAuth();
    console.log('登录成功');

    const file = new File([await getSnapshotZip(await getSnapshotId())], 'file.zip', {
      type: 'application/zip',
    });

    const remoteSnapshotId = String((await auth.uploadFile(file)).id);

    alert({
      headline: '上传成功！',
      description: `快照链接：https://i.gkd.li/i/${remoteSnapshotId}`,
      closeOnEsc: true,
      closeOnOverlayClick: true,
      confirmText: '复制',
      onConfirm: async () => {
        await navigator.clipboard.writeText(`https://i.gkd.li/i/${remoteSnapshotId}`);
      },
    });
  } catch (err) {
    console.error('失败:', err);
  }
};
