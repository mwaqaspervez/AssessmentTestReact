import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import localStorageService from './localStorageService';

export class APIError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);

    this.status = status;
  }

}

const axios: AxiosInstance = Axios.create({
  timeout: Number(process.env.REACT_APP_API_URL) || 50000,
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject(new APIError('Unable to reach server', 0));
    }

    if (error.response.data.message) {
      if (error?.response?.data?.statusCode === 403) {

        window.localStorage.clear();
        window.location.reload();

        return Promise.reject(new APIError(error.response.data.message, error.response.status));
      }

      return Promise.reject(new APIError(error.response.data.message, error.response.status));
    }

    return Promise.reject(new APIError(`Request failed with ${error.response.status}`, error.response.status));
  },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function axiosRequest(options: AxiosRequestConfig): Promise<any> {
  const response = await axios(options);
  if (response.headers['token']) {
    localStorageService.set('jwt', response.headers['token']);
  }
  return response.data;
}

export default axiosRequest;
