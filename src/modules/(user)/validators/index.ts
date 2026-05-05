import * as yup from "yup";

export const updateProfileSchema = yup.object({
   name: yup
      .string() //
      .trim()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),

   lastname: yup
      .string() //
      .trim()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be at most 50 characters"),

   bio: yup
      .string() //
      .trim()
      .max(200, "Bio must be at most 200 characters")
      .optional(),
});

export const inviteUserSchema = yup.object().shape({
   email: yup
      .string() //
      .email("Invalid email address")
      .required("Email is required"),
   password: yup
      .string() //
      .required("Password is required"),
});

export const updatePasswordSchema = yup.object({
   oldPassword: yup
      .string() //
      .required("Old password is required")
      .min(6, "Old password must be at least 6 characters"),

   newPassword: yup
      .string()
      .required("New password is required")
      .min(8, "New password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[@$!%*?&]/, "Must contain at least one special character"),
});
