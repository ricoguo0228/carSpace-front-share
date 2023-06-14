// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** carSpaceCreate POST /carSpaces/create */
export async function carSpaceCreateUsingPOST(
  body: API.CarSpaceCreateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/carSpaces/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** carSpaceDelete POST /carSpaces/delete */
export async function carSpaceDeleteUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/carSpaces/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCarSpaces POST /carSpaces/getCarSpaces */
export async function getCarSpacesUsingPOST(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/carSpaces/getCarSpaces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getReservedSpaces POST /carSpaces/getReservedCarSpaces */
export async function getReservedSpacesUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/carSpaces/getReservedCarSpaces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserSpaces POST /carSpaces/getUserCarSpaces */
export async function getUserSpacesUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/carSpaces/getUserCarSpaces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** carSpaceInvoke POST /carSpaces/invoke */
export async function carSpaceInvokeUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/carSpaces/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** carSpacePublish POST /carSpaces/publish */
export async function carSpacePublishUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/carSpaces/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** carSpaceUpdate POST /carSpaces/update */
export async function carSpaceUpdateUsingPOST(
  body: API.CarSpaceUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/carSpaces/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
