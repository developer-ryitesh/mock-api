import type { USER } from "./profile.constant";

interface ISession {
   id: string;
   email: string;
   password: string;
   role: keyof typeof USER.ROLES;
   isActive: boolean;
   deviceToken: string;
   profile: IProfile;
   createdAt: Date;
   updatedAt: Date;
}
interface IProfile {
   fullName?: string;
   bio?: string;
}

export type { ISession };
