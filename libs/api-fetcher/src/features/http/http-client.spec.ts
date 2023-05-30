import axios from 'axios';
import { AxiosHttpClient, HttpClient } from './http-client';

describe('AxiosHttpClient', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new AxiosHttpClient();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('get', () => {
    it('should make a GET request and return the response data', async () => {
      const url = 'https://example.com';
      const responseData = { message: 'Success' };
      const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: responseData });

      const result = await httpClient.get(url);

      expect(axiosGetMock).toHaveBeenCalledWith(url, { params: undefined });
      expect(result).toEqual(responseData);
    });

    it('should make a GET request with params and return the response data', async () => {
      const url = 'https://example.com';
      const params = { id: 1 };
      const responseData = { message: 'Success' };
      const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: responseData });

      const result = await httpClient.get(url, params);

      expect(axiosGetMock).toHaveBeenCalledWith(url, { params });
      expect(result).toEqual(responseData);
    });
  });

  describe('post', () => {
    it('should make a POST request and return the response data', async () => {
      const url = 'https://example.com';
      const requestData = { name: 'John' };
      const responseData = { message: 'Success' };
      const axiosPostMock = jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: responseData });

      const result = await httpClient.post(url, requestData);

      expect(axiosPostMock).toHaveBeenCalledWith(url, requestData, { params: undefined });
      expect(result).toEqual(responseData);
    });

    it('should make a POST request with params and return the response data', async () => {
      const url = 'https://example.com';
      const requestData = { name: 'John' };
      const params = { id: 1 };
      const responseData = { message: 'Success' };
      const axiosPostMock = jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: responseData });

      const result = await httpClient.post(url, requestData, params);

      expect(axiosPostMock).toHaveBeenCalledWith(url, requestData, { params });
      expect(result).toEqual(responseData);
    });
  });
});
