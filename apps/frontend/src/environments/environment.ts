import { io, type Socket } from "socket.io-client";

export default class Environment {
   private URL = Object.freeze({
      PRODUCTION: "/api/v1",
      DEVELOPMENT: "/api/v1",
   });

   private BYPASS(param: boolean) {
      return location.hostname === "localhost" && param;
   }

   static get BASE_URL(): string {
      switch (true) {
         case location.hostname !== "localhost":
            return new Environment().URL.PRODUCTION;
         case location.hostname === "localhost" && new Environment().BYPASS(true):
            return new Environment().URL.PRODUCTION;
         default:
            return new Environment().URL.DEVELOPMENT;
      }
   }

   static get SOCKET(): Socket {
      let socket: Socket | null = null;
      if (!socket) {
         socket = io("http://localhost:4000", {
            transports: ["websocket"], // recommended
            // autoConnect: false, // connect manually
         });
      }
      return socket;
   }

   static readonly PRODUCTION: boolean = location.hostname !== "localhost";
}
