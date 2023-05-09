import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import {
  trimValue,
  sanitizeParams,
  toCamelCase,
} from 'Utils/queryParams/transform-params';

/**
 * Add Authorization headers to API calls
 * @param {AxiosRequestConfig} request
 */
const authInterceptor = (request: AxiosRequestConfig) => {
  const requestConfig = trimValue(request);
  requestConfig.params = sanitizeParams(requestConfig.params);
  requestConfig.data = toCamelCase(requestConfig.data);

  const accessToken = 'abc123';

  if (accessToken) {
    const headers = requestConfig.headers as any;
    headers.AuthorizationAPI = `API ${accessToken}` as string;
  }
  return requestConfig;
};

/**
 * Axios error interceptor
 * @param {AxiosError} axiosError
 */
const errorInterceptor = async (axiosError: AxiosError) => {
  if (axiosError?.response) {
    const statusCode = axiosError.response.status;
    switch (statusCode) {
      case 401:
        // await logout();
        window.location.replace('/');
        break;
      case 403:
        window.location.replace('/');
        break;
      default:
    }
  }
  return Promise.reject(axiosError);
};

/**
 * Axios success response interceptor
 * @param {AxiosResponse} response
 */

const responseInterceptor = (response: AxiosResponse) => {
  response.data = toCamelCase(response.data);
  return response;
};

/** Setup an API instance */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

/** Add interceptor */
api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);
