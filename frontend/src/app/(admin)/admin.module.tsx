import { Navigate, Route, Routes } from "react-router";
import AdminLayout from "./admin.layout";
import OverviewPage from "./pages/overview/overview";
import NotFoundPage from "../404/page";
import NotificationPage from "../(notification)/notifications/notifications.page";
import SettingsPage from "./pages/settings/setting";
import ProfilePage from "../profile/page";
import UsersPage from "./pages/users/users.page";
import { adminUserReducer } from "./services/admin-user.service";
import { combineReducers } from "@reduxjs/toolkit";
import UserInfoPage from "./pages/user-info/user-info.page";

export const adminReducer = combineReducers({
   user: adminUserReducer,
});
export default function AdminModule() {
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
