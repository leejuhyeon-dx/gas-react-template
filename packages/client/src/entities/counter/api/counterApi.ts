import { apiGet, apiPost } from '@/shared/api/base'
import type { CounterResponse } from '../model/types'

export function fetchCount() {
  return apiGet<CounterResponse>('getCount')
}

export function incrementCount() {
  return apiPost<CounterResponse>('increment')
}

export function decrementCount() {
  return apiPost<CounterResponse>('decrement')
}

export function resetCount() {
  return apiPost<CounterResponse>('reset')
}
