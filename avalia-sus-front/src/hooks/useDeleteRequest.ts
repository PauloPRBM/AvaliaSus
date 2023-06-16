import { AxiosError, AxiosResponse } from 'axios';
import { Api } from './../lib/api';
import { useUser } from './useUser';


interface TError {
  message: string
}

interface Options {
  onSuccess: () => void
  onError: (error: AxiosError<TError>) => void
}

export const useDeleteRequest = (url: string, options: Options) => {
  const [{ user }] = useUser()
  const request = () => {
    Api.delete(url, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    })
      .then(() => {
        options.onSuccess()
      })
      .catch((error: AxiosError<TError>) => {
        options.onError(error)
      })

  }


  return request
}