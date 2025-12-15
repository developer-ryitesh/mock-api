export type ForgotPasswordDTO = {
   email: string;
};

export type ResetPasswordDTO = {
   otp: string;
   newPassword: string;
};

export type LoginDTO = {
   email: string;
   password: string;
};

export type RegisterDTO = {
   email: string;
   password: string;
   confirmPassword: string;
};
