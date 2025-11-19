type UpdateProfileDTO = {
   fullName: string;
   bio?: string;
};

type UpdatePasswordDTO = {
   oldPassword: string;
   newPassword: string;
};

export type { UpdateProfileDTO, UpdatePasswordDTO };
