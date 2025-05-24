import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';

abstract class AbstractRequest {
    protected axiosInstance: AxiosInstance;

    constructor(baseURL: string, timeout: number = 10000) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout,
        });

        this.initializeRequestInterceptor();
        this.initializeResponseInterceptor();
    }

    private initializeRequestInterceptor() {
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                let headers: AxiosHeaders = config.headers;
                return {
                    ...config,
                    headers
                };
            },
            (error) => {
                // Handle request error
                return Promise.reject(error);
            }
        );
    }

    private initializeResponseInterceptor() {
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Handle successful response
                return response;
            },
            (error) => {
                // Handle response error
                return Promise.reject(error);
            }
        );
    }

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get<T>(url, config);
    }

    protected post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post<T>(url, data, config);
    }

    protected put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put<T>(url, data, config);
    }

    protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.delete<T>(url, config);
    }
}

export default AbstractRequest;