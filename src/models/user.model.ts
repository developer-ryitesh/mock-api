import { FirestoreService } from "../libs/firebase/utils";

// ENUMS
const USER = {
   ROLES: {
      USER: "USER",
      ADMIN: "ADMIN",
   },
};
interface IProfile {
   fullName?: string;
   bio?: string;
}
type IUserModel = {
   id: string;
   email: string;
   password: string;
   role: keyof typeof USER.ROLES;
   isActive: boolean;
   deviceToken: string;
   profile: IProfile;
   createdAt: Date;
   updatedAt: Date;

   //reset token
   resetToken?: string;
   resetTokenExpDate?: Date;
};

const User = new FirestoreService<IUserModel>("users");
export default User;
export type { IUserModel, IProfile };
export { USER };
