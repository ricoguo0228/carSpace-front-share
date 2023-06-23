// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** AiCreateCarSpace POST /api/Ai/CarSpaceCreate */
export async function AiCreateCarSpaceUsingPOST(
  body: API.AiRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/Ai/CarSpaceCreate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** AiCreateCarSpaceSure POST /api/Ai/CarSpaceCreateSure */
export async function AiCreateCarSpaceSureUsingPOST(
  body: API.AiSureCreateCarSpaceRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/Ai/CarSpaceCreateSure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
