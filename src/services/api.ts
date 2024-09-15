import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:9090/api';
// const BASE_URL = 'http://localhost:8081/api';
// const BASE_URL = 'https://agrisistance-server.onrender.com/api';

interface ApiOptions extends AxiosRequestConfig {
  requireAuth?: boolean; // Optional flag to indicate if the call requires authentication
}

export const apiCall = async (route: string, options: ApiOptions, token?: string) => {
  const config: AxiosRequestConfig = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: options.requireAuth && token ? `Bearer ${token}` : undefined,
    },
    url: `${BASE_URL}${route}`,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};
