import axios from "axios";
import { getI18n } from "react-i18next";
export const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const getAccessToken = async () => {
  // get access token here
  return "";
};

const getRefreshToken = async () => {
  // get refresh token here
  return "";
};

axiosIns.interceptors.request.use(
  async (config) => {
    if (!config.headers["Authorization"]) {
      const token = await getAccessToken();
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    const i18n = getI18n();
    if (config.params) config.params.locale = i18n.resolvedLanguage;
    else config.params = { locale: i18n.resolvedLanguage };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosIns.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const idToken = await getRefreshToken();
      prevRequest.headers.Authorization = `Bearer ${idToken}`;
      return axiosIns({
        ...prevRequest,
        headers: prevRequest.headers.toJSON(),
      });
    }
    return Promise.reject(error);
  }
);

export default axiosIns;
