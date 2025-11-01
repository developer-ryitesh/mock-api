// types/express.d.ts
import { Request } from "express";

declare global {
   namespace Express {
      interface Request {
         user?: any; // Assuming UserDocument is the type for your User model
      }
   }
}
