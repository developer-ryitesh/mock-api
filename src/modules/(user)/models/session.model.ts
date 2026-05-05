export interface ISessionModel {
   id: string;
   email: string;
   password: string;
   role: "ADMIN" | "USER";
   isActive: boolean;
   profile: {
      fullName?: string;
      bio?: string;
   };
   createdAt: Date;
   updatedAt: Date;
}
