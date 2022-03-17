
import localStorageService from './localStorageService';
import axiosRequest from './axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8081/';

const getHeader = <T>(header: T) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': '',
  };
  const token = localStorageService.get('jwt');
  if (token) defaultHeaders.Authorization = `${token}`;
  if (header) return { ...defaultHeaders, ...header };

  return defaultHeaders;
};

type Request<P, D, H> = {
  method: 'POST' | 'PUT' | 'GET' | 'PATCH' | 'DELETE',
  url: string,
  params?: P,
  data?: D,
  header?: H
}

const request = <P, D, H>({ method, url, params, data, header }: Request<P, D, H>) => axiosRequest({
  baseURL: url === '/login' ? baseURL : baseURL + "v1",
  method,
  url,
  params,
  data,
  headers: getHeader(header),
})


const httpRequest = {
  request,
};

export default httpRequest;
