import { Navigate, Route, Routes } from "react-router";
import AuthLayout from "./auth.layout";
import NotFoundPage from "../404/page";
import LoginPage from "./pages/login/login.page";
import ForgotPasswordPage from "./pages/forgot-password/forgot-password.page";

export default function AuthModule() {
   return (
      <Routes>
         <Route element={<AuthLayout />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
         </Route>
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}
