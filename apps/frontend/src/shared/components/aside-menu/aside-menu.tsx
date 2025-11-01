import { forwardRef, useEffect, useImperativeHandle, useState, type ComponentType } from "react";
import { IoCloseCircle } from "react-icons/io5";

type Props = {
   children: Readonly<React.ReactNode>;
   AsideComponent: ComponentType<{ isToggle?: boolean }>;
   position: "left" | "right";
   width?: string;
   isOpen?: boolean;
   mode: "push" | "overlay";
   collapsibleWidth?: string;
};

export const AsideMenu = forwardRef(({ children, position, AsideComponent, width = "185px", isOpen, mode, collapsibleWidth }: Props, ref) => {
   const [toggle, setToggle] = useState(isOpen);

   useImperativeHandle(ref, () => ({ setToggle, toggle }), [toggle]);

   useEffect(() => {
      setToggle(isOpen);
   }, [isOpen]);

   if (mode === "overlay") {
      return (
         <>
            <div className="relative h-screen bg-gray-100">
               {toggle && <div onClick={() => setToggle(false)} className="fixed inset-0 z-40" style={{ background: "#00000040" }} />}
               <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${toggle ? "translate-x-0" : "-translate-x-full"}`} style={{ width }}>
                  <AsideComponent isToggle={toggle} />
               </div>
               {children}
            </div>
         </>
      );
   }

   return (
      <>
         <aside
            style={{
               transform: toggle ? "translateX(0)" : position === "left" ? "translateX(0%)" : "translateX(100%)",
               transition: "transform 150ms ease-in-out, opacity 150ms ease-in-out",
               width: toggle ? width : collapsibleWidth,
               position: "fixed",
               [position]: position === "left" ? 0 : toggle ? 0 : collapsibleWidth,
               top: 0,
            }}
            className={`border-0 overflow-x-hidden bg-white h-full z-40`}>
            <button type="button" onClick={() => setToggle(false)} className="absolute top-3 right-3">
               <IoCloseCircle size={20} className="text-red-600" />
            </button>
            <AsideComponent isToggle={toggle} />
         </aside>

         <main
            className="flex flex-col h-screen md:h-full"
            style={{
               transition: `margin-${position} 120ms ease-in-out`,
               [position === "left" ? "marginLeft" : "marginRight"]: toggle ? width : collapsibleWidth || "0px",
            }}>
            {children}
         </main>
      </>
   );
});
