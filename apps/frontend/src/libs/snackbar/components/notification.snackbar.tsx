import { IoClose } from "react-icons/io5";
import type { ToastProps } from "../types";
import { toast as sonnerToast } from "sonner";
import { useEffect } from "react";
import audios from "@/assets/audios";

type Props = ToastProps;

export function NotificationSnackbar(props: Props) {
   useEffect(() => {
      audios.newNotification.load();
      audios.newNotification.play();
      return () => {};
   }, []);

   return (
      <div
         className="flex items-start w-full md:w-[460px] bg-gray-50 border border-gray-200 
                    rounded-2xl p-5 animate-slideIn transition-all duration-300
                    hover:border-gray-300 hover:shadow-sm">
         {/* Icon */}
         <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-200 text-gray-700 text-2xl flex-shrink-0">🔔</div>

         {/* Content */}
         <div className="flex-1 ml-4">
            {props.title && <h4 className="text-base font-semibold text-gray-900 leading-snug">{props.title}</h4>}
            {props.body && <p className="text-sm text-gray-700 mt-1 leading-relaxed">{props.body}</p>}

            {/* Action */}
            {props.action && (
               <button
                  onClick={() => {
                     props.action?.onClick();
                     sonnerToast.dismiss(props.id);
                  }}
                  className="mt-4 px-3.5 py-1.5 text-sm font-medium text-gray-800 
                             border border-gray-300 rounded-lg bg-white hover:bg-gray-100 
                             focus:outline-none focus:ring-2 focus:ring-gray-300
                             transition-colors">
                  {props.action.label}
               </button>
            )}
         </div>

         {/* Close Button */}
         <button
            onClick={() => sonnerToast.dismiss(props.id)}
            className="ml-3 p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-200 
                       transition-colors">
            <IoClose size={18} />
         </button>
      </div>
   );
}
