import axios from "axios";
import qs from "qs";
import AppConsts from "../../library/appconsts";
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
} from "./interceptors";

const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1YmRlMTUzODkxMzUxMDFiZTA1YjgiLCJpYXQiOjE3MTA0MTY5MDksImV4cCI6MTcxMjE0NDkwOX0.TMpHVLMtbUllTqjlr4316ozB5kS8k3wqF7-KTFWReAA"
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { encode: false });
  },
});

http.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
http.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default http;
