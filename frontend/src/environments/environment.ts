export default class Environment {
   private SERVER_URL = import.meta.env.VITE_BASE_URL || "";
   private URL = Object.freeze({
      PRODUCTION: this.SERVER_URL + "/api/v1",
      DEVELOPMENT: "http://localhost:8000/api/v1",
   });

   private BYPASS(param: boolean) {
      return location.hostname === "localhost" && param;
   }

   static get BASE_URL(): string {
      switch (true) {
         case location.hostname !== "localhost":
            return new Environment().URL.PRODUCTION;
         case location.hostname === "localhost" && new Environment().BYPASS(false):
            return new Environment().URL.PRODUCTION;
         default:
            return new Environment().URL.DEVELOPMENT;
      }
   }

   static readonly PRODUCTION: boolean = location.hostname !== "localhost";
}
