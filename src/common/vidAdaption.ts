import { snackbar } from 'mdui';
import observeElement from '../utils/observeElement';
import getSnapshotId from '../utils/getSnapshotId';
import { getSnapshotInfo, getHanashiroSettings, writeSnapshotInfo } from '../utils/indexedDB';
import type { RawAttr } from '../types/snapshot';

observeElement('.n-tree', async () => {
  const snapshotId = await getSnapshotId();
  const snapshotInfo = (await getSnapshotInfo(snapshotId))!;

  const gkdVersionCode = (snapshotInfo as { gkdVersionCode?: number }).gkdVersionCode;
  const isVidAdapted = (snapshotInfo as { isVidAdapted?: boolean }).isVidAdapted;
  if (
    gkdVersionCode !== undefined &&
    gkdVersionCode < 15 &&
    (await getHanashiroSettings<boolean>('vidAdaption')) &&
    !isVidAdapted
  ) {
    const appId = snapshotInfo.appId;
    const nodes = snapshotInfo.nodes;

    // 需要先对 appId 的正则表达式元字符进行转义处理
    const regex = new RegExp(`${appId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:id\\/(.*)`);

    nodes.forEach((node, index) => {
      if (!node.attr.id) return;

      const match = node.attr.id.match(regex);

      if (!match) return;

      const vid = match[1];
      // 使 vid 放在 id 后，确保属性面板中 vid 紧跟 id
      const entries = Object.entries(node.attr);
      const keyIndex = entries.findIndex(([key]) => key === 'id');
      const before = entries.slice(0, keyIndex + 1);
      const after = entries.slice(keyIndex + 1);

      nodes[index].attr = Object.fromEntries([...before, ['vid', vid], ...after]) as RawAttr;
    });

    snapshotInfo.nodes = nodes;

    await writeSnapshotInfo(snapshotId, snapshotInfo);

    if (!(snapshotInfo as { isVidAdapted?: boolean }).isVidAdapted) {
      snackbar({
        message: 'vid 适配已完成，即将重新加载已应用……',
        placement: 'top',
        onClosed: async () => {
          (snapshotInfo as { isVidAdapted?: boolean }).isVidAdapted = true;
          await writeSnapshotInfo(snapshotId, snapshotInfo);
          window.location.reload();
        },
      });
    }
  }
});
