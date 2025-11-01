import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import NotFoundPage from "@/app/404/page";
import { Loading } from "@/shared/components";
import UserModule from "./(user)/user.module";
import AuthGuard from "@/guards/auth.guard";

const AdminModule = lazy(() => import("./(admin)/admin.module"));
const AuthModule = lazy(() => import("./(auth)/auth.module"));

export default function AppRouting() {
   return (
      <Suspense fallback={<Loading loading className="h-screen" />}>
         <Routes>
            <Route element={<AuthGuard allowedRoles={["USER", "ADMIN"]} />}>
               <Route path="/*" element={<UserModule />} />
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
