import Environment from "@/environments/environment";
import axios from "axios";
import InterceptorBuilder from "interceptor-builder";
import LoadingInterceptor from "./loading.interceptor";
import TokenInterceptor from "./token.interceptor";

export default class HttpClient {
   private instance = axios.create({
      baseURL: Environment.BASE_URL,
      headers: {},
      withCredentials:true,
   });

   get private() {
      return new InterceptorBuilder(this.instance) //
         .use(LoadingInterceptor)
         .use(TokenInterceptor)
         .build();
   }

   get public() {
      return new InterceptorBuilder(this.instance) //
         .use(LoadingInterceptor)
         .build();
   }
}
