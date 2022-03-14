import axios from "axios";

const BASE_URL = "";

type ReqHeaders = {
  [header: string]: string;
};

type CustomConfig = {
  data?: any;
  token?: string;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  headers?: ReqHeaders;
  [key: string]: any;
};

export async function client(
  endpoint: string,
  userId: string | null,
  {
    data,
    token,
    method = "GET",
    headers: customHeaders,
    ...customConfig
  }: CustomConfig = {}
) {
  const config = {
    url: endpoint,
    baseURL: BASE_URL,
    method,
    data,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      userid: userId || "", // temporary header
      ...customHeaders,
    },
    ...customConfig,
  };

  return axios(config).then((res) => res.data);
}
