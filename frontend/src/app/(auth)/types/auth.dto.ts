type ForgotPasswordDTO = {
   email: string;
};

type ResetPasswordDTO = {
   otp: string;
   newPassword: string;
   confirmPassword: string;
};

type LoginDTO = {
   email: string;
   password: string;
};
export type { LoginDTO, ForgotPasswordDTO, ResetPasswordDTO };
