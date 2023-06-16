import { AxiosError, AxiosResponse } from 'axios';
import { Api } from './../lib/api';
import { useUser } from './useUser';


interface TError {
  message: string
}

interface Options<TData> {
  onSuccess: (data: TData) => void
  onError: (error: AxiosError<TError>) => void
}

export const useGetRequest = <TData = unknown>(url: string, options: Options<TData>) => {
  const [{ user }] = useUser()
  const request = () => {
    Api.get<any, AxiosResponse<TData>>(url, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    })
      .then(({ data }) => {
        options.onSuccess(data)
      })
      .catch((error: AxiosError<TError>) => {
        options.onError(error)
      })

  }


  return request
}