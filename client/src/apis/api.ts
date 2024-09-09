import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { isHasValue } from "@/utils/validate";

type AxiosRetry = AxiosError["config"] & { _retry: boolean };

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRetry;
    if (!originalRequest) return Promise.reject(error);

    const isUnauthorized = error.response?.status === 401;

    if (isUnauthorized) {
      // logout();
    }

    return Promise.reject(error);
  }
);

export const apiRequest = async <
  Data = unknown,
  Response = AxiosResponse<Data>
>(
  config: AxiosRequestConfig
): Promise<Response> => {
  return instance.request({
    ...config,
    headers: {
      Accept: "application/json",
      ...config.headers,
    },
    withCredentials: true,
  });
};

export const apiGet = async <Data = unknown, Response = AxiosResponse<Data>>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<Response> => {
  const query = params
    ? `?${Object.keys(params)
        .map((key) => (isHasValue(params[key]) ? `${key}=${params[key]}` : ""))
        .filter(Boolean)
        .join("&")}`
    : "";

  return apiRequest<Data, Response>({
    url: `${url}${query}`,
    method: "GET",
    ...config,
  });
};

export const apiPost = async <Data = unknown, Response = AxiosResponse<Data>>(
  url: string,
  data?: Data,
  config?: AxiosRequestConfig
) => {
  return apiRequest<Data, Response>({
    url,
    data: data ?? null,
    method: "POST",
    ...config,
  });
};

export const apiPut = async <Data = unknown, Response = AxiosResponse<Data>>(
  url: string,
  data?: Data,
  config?: AxiosRequestConfig
) => {
  return apiRequest<Data, Response>({
    url,
    data: data ?? null,
    method: "PUT",
    ...config,
  });
};

export const apiPatch = async <Data = unknown, Response = AxiosResponse<Data>>(
  url: string,
  data?: Data,
  config?: AxiosRequestConfig
) => {
  return apiRequest<Data, Response>({
    url,
    data: data ?? null,
    method: "PATCH",
    ...config,
  });
};

export const apiDelete = async <Data = unknown, Response = AxiosResponse<Data>>(
  url: string,
  config?: AxiosRequestConfig
) => {
  return apiRequest<Data, Response>({
    url,
    method: "DELETE",
    ...config,
  });
};
