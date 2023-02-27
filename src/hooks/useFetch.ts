import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosResponse, AxiosError } from "axios";
import toastOption from "../configs/toast";
export interface IResponseData<T> {
  data: T;
  code: number;
  message: string;
}
export interface IResponse<T> extends AxiosResponse {
  data: IResponseData<T>;
}

export default function useFetch<T>(
  fetcher: any,
  fetchOptions = { toastOnError: true }
) {
  const [loading, setLoading] = useState(false);

  const execute = (params?: any) => {
    setLoading(true);
    return new Promise<IResponseData<T>>((resolve, reject) => {
      fetcher(params)
        ?.then((res: IResponse<T>) => {
          if (![200, 201].includes(res.status) && fetchOptions?.toastOnError) {
            toast(res.data.message, toastOption("error"));
          }
          resolve(res.data);
        })
        .catch(
          (
            err: AxiosError<{ message?: string; error?: string; err?: string }>
          ) => {
            if (fetchOptions?.toastOnError) {
              toast(
                err.response?.data?.message ||
                  err.response?.data?.err ||
                  err.response?.data?.error ||
                  err.message,
                toastOption("error")
              );
            }
            reject(err);
          }
        )
        .finally(() => setLoading(false));
    });
  };

  return { loading, execute };
}
