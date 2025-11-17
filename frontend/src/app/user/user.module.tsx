import { Component } from "react";
import { Route, Routes, Outlet } from "react-router";

export default class UserModule extends Component {
   render() {
      return (
         <Routes>
            <Route element={<Outlet />}>
               <Route index element={<p>User page</p>} />
            </Route>
            <Route path="*" element={<p>404</p>} />
         </Routes>
      );
   }
}
