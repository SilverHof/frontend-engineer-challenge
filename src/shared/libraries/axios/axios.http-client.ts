import type { AxiosRequestConfig, AxiosResponse } from 'axios'

import { axiosInstance } from './axios.instance.ts'

export const axiosHttpClient = <Response, Request = undefined>(
  config: AxiosRequestConfig<Request>
): Promise<AxiosResponse<Response, Request>> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance(config)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
