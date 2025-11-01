import { toast as sonnerToast } from "sonner";
import type { ToastProps } from "../types";
import { FaTimesCircle } from "react-icons/fa";

type Props = ToastProps;

export function ErrorSnackbar(props: Props) {
   return (
      <div
         className="flex flex-wrap w-full md:max-w-[550px] items-center justify-between
         gap-3 rounded-2xl bg-gradient-to-r from-red-50 to-red-100 shadow-lg
         ring-1 ring-red-200 border-l-4 border-red-500 p-4 animate-slideIn">
         {/* Left: Icon + Text */}
         <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0">
               <FaTimesCircle className="h-6 w-6 text-red-500 drop-shadow-sm" />
            </div>
            <div>
               <p className="text-sm font-semibold text-red-900 tracking-wide">{props.title}</p>
               <p className="mt-1 text-xs text-red-700 leading-snug">{props.body}</p>
            </div>
         </div>

         {/* Right: Action Button */}
         {props?.action && (
            <div className="flex-shrink-0">
               <button
                  className="rounded-full bg-red-500 px-4 py-1.5 text-xs font-semibold
                  text-white shadow-sm hover:bg-red-600 transition-colors duration-200"
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
