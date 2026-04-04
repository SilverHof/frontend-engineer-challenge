import { apiClientInstance, apiClientInstanceWithRetry } from './api-client.instance.ts'
import { requestInterceptor } from './api-client.interceptors.request.ts'
import { responseInterceptor } from './api-client.interceptors.response.ts'

export const setupApiClientInterceptors = () => {
  apiClientInstance.interceptors.request.use(requestInterceptor)
  apiClientInstance.interceptors.response.use((config) => config, responseInterceptor)
}

export const setupApiClientInterceptorsWithRetry = () => {
  apiClientInstanceWithRetry.interceptors.request.use(requestInterceptor)
  apiClientInstanceWithRetry.interceptors.response.use((config) => config, responseInterceptor)
}
