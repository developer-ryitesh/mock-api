import Environment from "@/environments/environment";
import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import type { Interceptor, Req, Res } from "interceptor-builder";
import firebase from "../firebase/config";

export default class TokenInterceptor implements Interceptor {
   public instance;
   constructor(instance: AxiosInstance) {
      this.instance = instance;
   }

   protected clear = async () => {
      localStorage.clear();
       await firebase.swUnregister();
       setTimeout(() => {
         window.location.replace("/auth/login");
       }, 50);
   };

   private refreshTokenApi = async () => {
      try {
         const { data } = await axios.get(Environment.BASE_URL + "/auth/refresh-token", {
            withCredentials: true
         });
         localStorage.setItem("accessToken", data.data?.accessToken);
         return data?.data;
      } catch (error) {
         this.clear();
         return error;
      }
   };

   private getToken = async () => {
      const token = {
         accessToken: (localStorage.getItem("accessToken") as string) || "",
      };
      return token;
   };

   intercept(request: Req, response: Res) {
      request.use(
         async (config) => {
            const token = await this.getToken();
            if (token) config.headers.Authorization = `Bearer ${token.accessToken}`;
            return config;
         },
         (error) => Promise.reject(error)
      );

      response.use(
         (res) => res,
         async (error: AxiosError) => {
            try {
               const status = error.response?.status;
               const originalRequest = error.config as any;
               if (status === 401 && !originalRequest?._retry) {
                  originalRequest._retry = true;
                  const token = await this.getToken();
                  if (!token.accessToken) return;
                  /*---refreshTokenApi---*/
                  const data = await this.refreshTokenApi();
                  if (data?.accessToken) {
                     originalRequest.headers["Authorization"] = `Bearer ${data?.accessToken}`;
                     return axios(originalRequest);
                  }
               }
               return Promise.reject(error);
            } catch (error) {
               return Promise.reject(error);
            }
         }
      );
      return this.instance;
   }
}
