// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addReservation POST /api/reserve/add */
export async function addReservationUsingPOST(
  body: API.ReservationAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/reserve/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** currentReservations POST /api/reserve/current */
export async function currentReservationsUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListReservation>('/api/reserve/current', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteReservation POST /api/reserve/delete */
export async function deleteReservationUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/reserve/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
