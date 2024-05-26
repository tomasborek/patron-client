import { IResponse } from '@/common/interfaces/server';
import axios, { AxiosHeaders } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_ROOT_URL;
const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX;

export class ApiService {
  token: string | undefined;
  prefix: string | undefined;
  constructor(token?: string, prefix?: string) {
    this.token = token;
    this.prefix = prefix;
  }
  public url(path?: string) {
    return `${API_URL}${API_PREFIX}${this.prefix ?? ''}${path ?? ''}`;
  }

  public getBearer(token: string | undefined) {
    if (!token) return undefined;
    return `Bearer ${token}`;
  }

  public sendRequest<T>(
    method: string,
    url: string,
    options?: {
      withCredentials?: boolean;
      data?: object;
      params?: object;
      headers?: AxiosHeaders;
    },
  ) {
    return axios<IResponse<T>>({
      method,
      url,
      params: options?.params,
      data: options?.data,
      headers: {
        ...options?.headers,
        Authorization:
          options?.withCredentials && this.token
            ? this.getBearer(this.token)
            : undefined,
      },
    });
  }
}
