import axios from "axios";
// import { useToast } from "vue-toastification";

// const toast = useToast();
const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return new Promise((resolve, reject) => {
      if (err.response?.status === 401 && err.config) {
        localStorage.clear();
        // toast.info("Session expired, Please login");
        window.location.replace("/");
      }
      return reject(err);
    });
  }
);

export const axiosInstance = instance;
