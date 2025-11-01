interface LoginDTO {
   email: string;
   password: string;
}

interface RegisterDTO {
   email: string;
   password: string;
   confirmPassword: string;
}

interface ForgotPasswordDTO {
   email: string;
}

interface ResetPasswordDTO {
   otp: string;
   newPassword: string;
   confirmPassword: string;
}
export type { LoginDTO, RegisterDTO, ForgotPasswordDTO, ResetPasswordDTO };
