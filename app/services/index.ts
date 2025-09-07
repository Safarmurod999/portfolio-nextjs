import { BASE_URL } from '@/app/const/data';
import axios from "axios";
import { get } from "lodash";
import { toast } from "sonner";

const request = axios.create({
  baseURL: BASE_URL,
  params: {},
});
let store;

export const injectStore = (_store) => {
  store = _store;
};
request.interceptors.request.use(
  (config) => {
    // if (!config.headers.Authorization) {
    //   const token = store.getState().auth.token;

    //   if (token) {
    //     config.headers.Authorization = token;
    //   }
    // }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = get(error, "response.status");
    const errorMsg = get(error, "response.data.error", "");

    switch (status) {
      case 409:
        toast.error(errorMsg);
        return;
      case 401:
        toast.warning(errorMsg);
        return;
      case 400:
        toast.error(errorMsg);
        return;
      case 500:
        toast.error("Server error!");
        return;
      default:
        return error;
    }
  }
);

export default request;
