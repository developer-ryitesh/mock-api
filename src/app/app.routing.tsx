import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import NotFoundPage from "@/app/404/page";
import { Loading } from "@/shared/components";
import AuthGuard from "@/guards/auth.guard";
import LandingPage from "./landing/landing.page";

const UserModule = lazy(() => import("./user/user.module"));
const AdminModule = lazy(() => import("./(admin)/admin.routes"));
const AuthModule = lazy(() => import("./auth/auth.routes"));

export default function AppRouting() {
   return (
      <Suspense fallback={<Loading loading className="h-screen" />}>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<AuthGuard allowedRoles={["USER"]} />}>
               <Route path="user" element={<UserModule />} />
            </Route>
            <Route path="auth/*" element={<AuthModule />} />
            <Route element={<AuthGuard allowedRoles={["ADMIN"]} />}>
               <Route path="admin/*" element={<AdminModule />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
         </Routes>
      </Suspense>
   );
}
