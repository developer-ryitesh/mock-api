type ForgotPasswordDTO = {
   email: string;
};

type ResetPasswordDTO = {
   otp: string;
   newPassword: string;
   confirmPassword: string;
};

type UpdateProfileDTO = {
   fullName: string;
   bio?: string;
};

type UpdatePasswordDTO = {
   oldPassword: string;
   newPassword: string;
};

type LoginDTO = {
   email: string;
   password: string;
};
export type { LoginDTO, ForgotPasswordDTO, ResetPasswordDTO, UpdateProfileDTO, UpdatePasswordDTO };
