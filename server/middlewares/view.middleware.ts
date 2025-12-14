// render-view.ts
import path from "path";
import fs from "fs";
import express, { Request, Response, NextFunction } from "express";


export default function view() {
   const views = path.resolve(__dirname, "../../build/views");

   const hasIndex = fs.existsSync(path.join(views, "index.html"));
   if (hasIndex) {
      const staticMiddleware = express.static(views);

      return (req: Request, res: Response, next: NextFunction) => {
         staticMiddleware(req, res, (err: any) => {
            if (err) return next(err);
            if (!req.path.startsWith("/api")) {
               return res.sendFile(path.join(views, "index.html"));
            }
            next();
         });
      };
   }
   // Fallback (no frontend built)
   return (req: Request, res: Response, next: NextFunction) => next();
}
