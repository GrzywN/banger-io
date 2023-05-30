import axios from 'axios';

export interface HttpClient {
  get<T>(url: string, params?: Record<string, unknown>): Promise<T>;
  post<T>(url: string, data?: Record<string, unknown>, params?: Record<string, unknown>): Promise<T>;
}

export class AxiosHttpClient implements HttpClient {
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await axios.get<T>(url, { params });

    return response.data;
  }

  async post<T>(url: string, data?: Record<string, unknown>, params?: Record<string, unknown>): Promise<T> {
    const response = await axios.post<T>(url, data, { params });

    return response.data;
  }
}
