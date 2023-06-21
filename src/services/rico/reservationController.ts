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

/** currentReservationsInCreate POST /api/reserve/currentCreate */
export async function currentReservationsInCreateUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListReservation>('/api/reserve/currentCreate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** currentReservationsInReserve POST /api/reserve/currentReserve */
export async function currentReservationsInReserveUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListReservation>('/api/reserve/currentReserve', {
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
