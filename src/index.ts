import dotenv from "dotenv";
import app from "./app/app";
import { createServer } from "http";
import CONFIG from "./config";

dotenv.config();

// CONSTANTS
const PORT = CONFIG.PORT;
const HAS_PROD = CONFIG.HAS_PROD;
const SERVER_URL = CONFIG.SERVER_URL;
const DEV_URL = CONFIG.DEV_URL;
const MODE = HAS_PROD ? "PRODUCTION" : "DEVELOPMENT";
const IP = CONFIG.IP;


const httpServer = createServer(app);
httpServer.listen(PORT, "0.0.0.0", () => {
   // LOG UI
   console.log("\n");
   console.log("\n" + HAS_PROD ? "🚀 PRODUCTION" : "✅ DEVELOPMENT" + " SERVER STARTED");
   console.log("___________________________________________\n");
   console.log(`💻 MODE : ${MODE}`);
   console.log(`⚡ BASE URL : ${HAS_PROD ? SERVER_URL : DEV_URL}/api/v1`);
   !HAS_PROD && console.log(`🌐 NETWORK : http://${IP}:${PORT}/api/v1`);
   console.log(`📚 DOCS : ${HAS_PROD ? SERVER_URL : DEV_URL}/docs`);
   console.log(`📌 PORT : ${PORT}`);
   console.log("___________________________________________\n");

   // LOGGER
});
export default httpServer;
