import { Firestore } from "../../../libs/firebase";

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
   profile: IProfile;
   createdAt: Date;
   updatedAt: Date;

   //reset token
   resetToken?: string;
   resetTokenExpDate?: Date;
};

const User = new Firestore<IUserModel>("users");
export default User;
export type { IUserModel, IProfile };
export { USER };
