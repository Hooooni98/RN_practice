import axios from 'axios';
import {BASEURL, AUTHORIZATION, DEVICEID} from '@env';
const baseURL = BASEURL;
const headers = {
  Authorization: AUTHORIZATION,
  os: 'ios',
  'device-id': DEVICEID,
};
const ApiMangerV1 = axios.create({
  baseURL: baseURL, // your url
  responseType: 'json',
  headers: headers, // your headers
  withCredentials: true,
});

ApiMangerV1.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // console.log("requestError====>", error);
  },
);

ApiMangerV1.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // console.log("responseError====>", error);
  },
);

export {ApiMangerV1};
