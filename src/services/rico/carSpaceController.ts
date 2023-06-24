// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** carSpaceCreate POST /api/carSpaces/create */
export async function carSpaceCreateUsingPOST(
  body: API.CarSpaceCreateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/carSpaces/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCurrentCarSpace POST /api/carSpaces/current */
export async function getCurrentCarSpaceUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseComplCarspace>('/api/carSpaces/current', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** carSpaceDelete POST /api/carSpaces/delete */
export async function carSpaceDeleteUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/carSpaces/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** carSpaceInvoke POST /api/carSpaces/invoke */
export async function carSpaceInvokeUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/carSpaces/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listCarSpaces POST /api/carSpaces/listCarSpaces */
export async function listCarSpacesUsingPOST(
  body: API.ListCarSpaceRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageComplCarspace>('/api/carSpaces/listCarSpaces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listReservedSpaces POST /api/carSpaces/listReservedCarSpaces */
export async function listReservedSpacesUsingPOST(
  body: API.ListCarSpaceRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageComplCarspace>('/api/carSpaces/listReservedCarSpaces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listUserSpaces POST /api/carSpaces/listUserCarSpaces */
export async function listUserSpacesUsingPOST(
  body: API.ListCarSpaceRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageComplCarspace>('/api/carSpaces/listUserCarSpaces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** carSpacePublish POST /api/carSpaces/publish */
export async function carSpacePublishUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/carSpaces/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** carSpaceUpdate POST /api/carSpaces/update */
export async function carSpaceUpdateUsingPOST(
  body: API.CarSpaceUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/carSpaces/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
