import path from "path";
import fs from "fs";
import express, { Express } from "express";

export default function ConnectFrontend(app: Express) {
   const frontend = path.resolve(__dirname, "../../../build/views");
   if (fs.existsSync(path.join(frontend, "index.html"))) {
      app.use(express.static(frontend));
      app.get(/^\/(?!api).*/, (req, res) => res.sendFile(path.join(frontend, "index.html")));
   }
}
