import { Navigate, Route, Routes } from "react-router";
import AdminLayout from "./admin.layout";
import OverviewPage from "./overview/overview";
import NotFoundPage from "../404/page";
import NotificationPage from "../notifications/notifications.page";
import SettingsPage from "./settings/setting";
import ProfilePage from "../profile/page";
import UsersPage from "./users/users.page";
import UserInfoPage from "./user-info/user-info.page";

export default function AdminRoutes() {
   return (
      <Routes>
         <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="notification" element={<NotificationPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:id" element={<UserInfoPage />} />
            <Route path="*" element={<NotFoundPage />} />
         </Route>
      </Routes>
   );
}
