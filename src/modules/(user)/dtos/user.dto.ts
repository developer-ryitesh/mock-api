import type { inviteUserSchema, updatePasswordSchema, updateProfileSchema } from "../validators";
import * as Yup from "yup";

export interface UserStatusDTO {
   userId: string;
   status: "true" | "false";
}

export type UpdateProfileDTO = Yup.InferType<typeof updateProfileSchema>;
export type InviteUserDTO = Yup.InferType<typeof inviteUserSchema>;
export type UpdatePasswordDTO = Yup.InferType<typeof updatePasswordSchema>;
