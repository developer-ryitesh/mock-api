import * as Yup from "yup";

export const loginSchema = Yup.object({
   email: Yup.string() //
      .required("Email is required!")
      .email("Invalid email format"),

   password: Yup.string() //
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters"),
}).noUnknown(true, "Unknown fields are not allowed");
