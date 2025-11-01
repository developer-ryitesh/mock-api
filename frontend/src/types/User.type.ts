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
};

interface IUser {
   id: string;
   email: string;
   password: string;
   role: keyof typeof USER.ROLES;
   isActive: boolean;
   deviceToken: string;
   profile: IProfile;
   createdAt: Date;
   updatedAt: Date;
};

export type { IUser, IProfile };
export { USER };