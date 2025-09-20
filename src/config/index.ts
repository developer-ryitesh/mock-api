import os from "os";
import dotenv from "dotenv";
dotenv.config();

const CONFIG = {
    PORT: Number(process.env.PORT) || 3000,
    HAS_PROD: process.env.NODE_ENV === "production",
    SERVER_URL: "https://api-6nsy.onrender.com",
    get DEV_URL() { return `http://localhost:${this.PORT}` },
    get MODE() { return this.HAS_PROD ? "PRODUCTION" : "DEVELOPMENT" },
    IP: Object.values(os.networkInterfaces()).flat().find(net => {
        return net?.family === "IPv4" && !net.internal
    })?.address || "N/A",
}
export default CONFIG;