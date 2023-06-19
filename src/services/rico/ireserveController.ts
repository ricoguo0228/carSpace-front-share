// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** timeSlotsDelete POST /api/Ireserve/delete */
export async function timeSlotsDeleteUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/Ireserve/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** timeSlotsIncrease POST /api/Ireserve/increase */
export async function timeSlotsIncreaseUsingPOST(
  body: API.IreserveIncreaseRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/Ireserve/increase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listTimeSlots POST /api/Ireserve/listTimeSlots */
export async function listTimeSlotsUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListIreserve>('/api/Ireserve/listTimeSlots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
