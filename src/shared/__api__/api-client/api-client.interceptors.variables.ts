import type { TokenState } from './api-client.types.ts'

export const tokenState: TokenState = {
  isRefreshing: false,
  requestQueue: [],
}
