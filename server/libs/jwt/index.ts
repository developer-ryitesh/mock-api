import * as jsonwebtoken from "jsonwebtoken";

type CreateTokenParams = {
   data: { id: string };
   exp: string;
};

export default class JWT {
   createToken = ({ data, exp }: CreateTokenParams) => {
      const expiresIn = String(exp)?.replace("-", "");
      const token = jsonwebtoken.sign(data, process.env.JWT_SECRET_KEY as string, {
         expiresIn: expiresIn as any,
      });
      return token;
   };

   verifyToken = async (token: string) => {
      try {
         const verify = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY as string);
         return verify as CreateTokenParams["data"];
      } catch (error: any) {
         throw error; 
      }
   };
}
