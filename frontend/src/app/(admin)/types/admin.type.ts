import type { IProfile } from "@/types/User.type";

interface IUser {
   id: string;
   email: string;
   createdAt: string;
   role: string;
   isActive: boolean;
   deviceToken: string;
   updatedAt: string;
   profile: IProfile;
}
export type { IUser };
