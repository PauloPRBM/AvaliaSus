import { AxiosError, AxiosProxyConfig, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Api } from './../lib/api';


interface TError {
  message: string
}

interface Options<TData> {
  onSuccess: (data: TData) => void
  onError: (error: AxiosError<TError>) => void
}



export const usePostRequest = <TVariable = unknown, TData = unknown>(url: string, options: Options<TData>, config?: AxiosRequestConfig<TVariable>) => {
  const request = (props: TVariable) => {
    Api.post<any, AxiosResponse<TData>, TVariable>(url, props, config)
      .then(({ data }) => {
        options.onSuccess(data)
      })
      .catch((error: AxiosError<TError>) => {
        options.onError(error)
      })

  }


  return request
}