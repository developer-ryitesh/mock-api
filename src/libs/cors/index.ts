import type { CorsOptions } from "cors";

const corsConfig: CorsOptions = {
   origin: ["http://localhost:3000", "https://yourdomain.com"],
   credentials: true,
};
export default corsConfig;
