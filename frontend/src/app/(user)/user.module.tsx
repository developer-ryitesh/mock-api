import { Navigate, Route, Routes } from "react-router";
import UserLayout from "./user.layout";
import OverviewPage from "./pages/overview/overview";
import NotFoundPage from "../404/page";
import NotificationPage from "../(notification)/notifications/notifications.page";
import SettingsPage from "./pages/settings/setting";
import ProfilePage from "../profile/page";
import UsersPage from "./pages/users/users.page";
import { adminUserReducer } from "./services/admin-user.service";
import { combineReducers } from "@reduxjs/toolkit";

export const adminReducer = combineReducers({
   user: adminUserReducer,
});
export default function UserModule() {
   return (
      <Routes>
         <Route element={<UserLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="notification" element={<NotificationPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="*" element={<NotFoundPage />} />
         </Route>
      </Routes>
   );
}
