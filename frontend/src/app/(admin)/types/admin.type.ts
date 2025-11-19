import type { ISession } from "@/app/profile/types/profile.type";

interface IUser {
   id: string;
   email: string;
   createdAt: string;
   role: string;
   isActive: boolean;
   deviceToken: string;
   updatedAt: string;
   profile: ISession["profile"];
}
export type { IUser };
