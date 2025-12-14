import type HttpClient from "@/libs/interceptors";

export default class NotificationRepository {
   constructor(private _http: HttpClient) {}

   subscribeByDeviceToken = async (deviceToken: string) => {
      return await this._http.private.post("/notification/subscribe", { deviceToken });
   };

   getAllNotifications = async () => {
      return await this._http.private.get("/notification/all");
   };

   markAsRead = async (ids: string[]) => {
      return await this._http.private.patch("/notification/read", { ids });
   };
}
