import { Navigate, Route, Routes } from "react-router";
import UserLayout from "./user.layout";
import OverviewPage from "./pages/overview/overview";
import NotFoundPage from "../404/page";
import NotificationPage from "../(notification)/notifications/notifications.page";
import SettingsPage from "./pages/settings/setting";
import ProfilePage from "../profile/page";

export default function UserModule() {
   return (
      <Routes>
         <Route element={<UserLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="notification" element={<NotificationPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
         </Route>
      </Routes>
   );
}
