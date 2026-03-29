export interface IGithubDeviceFlowLogin {
  device_code: string;
  user_code: string;
  verification_uri: string;
  expires_in: number;
  interval: number;
}

export interface IGithubDeviceFlowAccessToken {
  access_token: string;
  token_type: string;
  scope: string;
  error?:
    | 'authorization_pending'
    | 'slow_down'
    | 'expired_token'
    | 'unsupported_grant_type'
    | 'incorrect_client_credentials'
    | 'incorrect_device_code'
    | 'access_denied'
    | 'device_flow_disabled';
  error_description?:
    | 'authorization_pending'
    | 'slow_down'
    | 'expired_token'
    | 'unsupported_grant_type'
    | 'incorrect_client_credentials'
    | 'incorrect_device_code'
    | 'access_denied'
    | 'device_flow_disabled';
}

export interface IGithubUploadPolicy {
  upload_url: string;
  form_data: Record<string, string>;
  asset_upload_id: string;
  asset_url: string;
  id: number;
}
