export interface InviteUserDTO {
   email: string;
   password: string;
}
export interface UserStatusDTO {
   userId: string;
   status: "true" | "false";
}

export type UpdateProfileDTO = {
   name: string;
   lastname: string;
   bio?: string;
};

export type UpdatePasswordDTO = {
   oldPassword: string;
   newPassword: string;
};
