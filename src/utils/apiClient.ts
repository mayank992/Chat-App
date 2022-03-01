import axios from "axios";
import { HttpMethods } from "../types/requestTypes";

const BASE_URL = "";

type ReqHeaders = {
  [header: string]: string;
};

type CustomConfig = {
  data?: any;
  token?: string;
  method?: HttpMethods;
  headers?: ReqHeaders;
  [key: string]: any;
};

export async function client(
  endpoint: string,
  {
    data,
    token,
    method,
    headers: customHeaders,
    ...customConfig
  }: CustomConfig = {}
) {
  const config = {
    url: endpoint,
    baseURL: BASE_URL,
    method: method || HttpMethods.GET,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...customHeaders,
    },
    ...customConfig,
  };

  return axios(config)
    .then((res) => res.data)
    .catch((error) => error.response);
}
