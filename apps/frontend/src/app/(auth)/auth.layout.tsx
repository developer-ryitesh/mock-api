import { LuGalleryVertical } from "react-icons/lu";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
   return (
      <div className="grid min-h-svh lg:grid-cols-1">
         <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
               <Link to="/" className="flex items-center gap-2 font-medium" replace>
                  <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                     <LuGalleryVertical className="size-4" />
                  </div>
                  TraceYards
               </Link>
            </div>
            <div className="flex flex-1 items-center justify-center">
               <div className="w-full max-w-xs">
                  <img //
                     className="mx-auto mb-3"
                     src="/vite.svg"
                     alt="Your Company"
                     width={170}
                     height={170}
                  />
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   );
}