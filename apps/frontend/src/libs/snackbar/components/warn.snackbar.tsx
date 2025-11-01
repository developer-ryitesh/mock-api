import { toast as sonnerToast } from "sonner";
import type { ToastProps } from "../types";
import { FaExclamationTriangle } from "react-icons/fa";

type Props = ToastProps;

export function WarnSnackbar(props: Props) {
   return (
      <div
         className="flex flex-wrap w-full md:max-w-[380px] items-center justify-between
         gap-3 rounded-2xl bg-gradient-to-r from-yellow-50 to-yellow-100 shadow-lg
         ring-1 ring-yellow-200 border-l-4 border-yellow-500 p-4 animate-slideIn">
         {/* Left: Icon + Text */}
         <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0">
               <FaExclamationTriangle className="h-6 w-6 text-yellow-500 drop-shadow-sm" />
            </div>
            <div>
               <p className="text-sm font-semibold text-yellow-900 tracking-wide">{props.title}</p>
               <p className="mt-1 text-xs text-yellow-700 leading-snug">{props.body}</p>
            </div>
         </div>

         {/* Right: Optional Action Button */}
         {props?.action && (
            <div className="flex-shrink-0">
               <button
                  className="rounded-full bg-yellow-500 px-4 py-1.5 text-xs font-semibold
                  text-white shadow-sm hover:bg-yellow-600 transition-colors duration-200"
                  onClick={() => {
                     props.action?.onClick();
                     sonnerToast.dismiss(props.id);
                  }}>
                  {props.action.label}
               </button>
            </div>
         )}
      </div>
   );
}
