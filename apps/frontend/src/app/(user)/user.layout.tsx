import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { RouterLink } from "@/libs/router/components";
import { AsideMenu } from "@/shared/components";
import { useMediaQuery } from "@/shared/hooks";
import { useRef } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { Outlet } from "react-router";
import { IoIosNotifications } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { LuBell } from "react-icons/lu";
import { RiMenuFold2Line } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { authService } from "../(auth)/services/auth.service";
import { Button } from "@/shared/ui";
import { PushNotification } from "@/libs/firebase/components";
import { useAppRouter } from "@/libs/router/hooks";

const links = [
   {
      to: "/overview",
      Icon: AiOutlineDashboard,
      label: "Dashboard",
   },
   {
      to: "/notification",
      Icon: IoIosNotifications,
      label: "Notification",
   },
   {
      to: "/settings",
      Icon: CiSettings,
      label: "Settings",
   },
];
export default function UserLayout() {
   const asideRef = useRef<any>(null);
   const router = useAppRouter();
   const screen = useMediaQuery();
   const dispatch = useAppDispatch();
   const { session, logout } = useAppSelector((state) => state.auth);

   const onToggle = () => {
      asideRef.current?.setToggle((x: boolean) => !x);
   };

   return (
      <AsideMenu //
         ref={asideRef}
         isOpen={!screen.sm}
         mode={screen.sm ? "overlay" : "push"}
         width={screen.sm ? "330px" : "270px"}
         collapsibleWidth="65px"
         position="left"
         AsideComponent={(props) => (
            <aside className="flex-shrink-0 relative">
               <div style={{ height: "calc(100vh - 59px)" }}>
                  <div className="h-[58px] bg-white px-5 flex items-center border-gray-300 border-b border-r">
                     <div>
                        <span className="font-bold text-[20px]">{props.isToggle || screen.sm ? "TraceYards" : "TY"}</span>
                        {props.isToggle && <span className="text-[10px] font-semibold text-[#716F6F] block uppercase">{session.data?.role}</span>}
                     </div>
                  </div>
                  <div className="p-2">
                     <PushNotification />
                     {links.map(({ to, Icon, label }) => (
                        <RouterLink
                           key={to}
                           to={to}
                           className={`w-full text-[13px] py-2 px-3 rounded-[7px]  gap-2 mb-1 flex items-center ${props.isToggle || screen.sm ? "" : "justify-center"}`}
                           activeClassName="bg-[#D9FFF7] font-semibold">
                           <Icon size={17} /> {props.isToggle || screen.sm ? label : ""}
                        </RouterLink>
                     ))}
                  </div>
               </div>
               <div className="border-gray-300 border-t h-[57px] flex justify-center items-center p-2">
                  <Button accent="error" variant="link" onClick={() => dispatch(authService.logout.api())} loading={logout.isLoading}>
                     <MdLogout size={17} /> {props.isToggle || screen.sm ? "logout" : ""}
                  </Button>
               </div>
            </aside>
         )}>
         <header className="border-b border-gray-300 bg-white flex items-center justify-between w-full h-[58px] px-5">
            <span className="flex items-center gap-3">
               <button onClick={onToggle}>
                  <RiMenuFold2Line size={20} />
               </button>
               <span className="font-bold text-[20px] block md:hidden">TraceYards</span>
            </span>
            <div className="flex items-center gap-2">
               <button className="cursor-pointer" onClick={() => router.replace("/profile")}>
                  <img src="/images/avartar.png" alt="" width={28} height={28} className="block rounded-full border" />
               </button>
               <span className="px-2">|</span>
               <span //
                  {...{ "data-badge": 10 }}>
                  <LuBell size={20} />
               </span>
            </div>
         </header>
         <div //
            className="bg-[#F2FCFA] overflow-y-auto"
            style={{ height: "calc(100vh - 58px)" }}>
            <Outlet />
         </div>
      </AsideMenu>
   );
}
