import { toast as sonnerToast } from "sonner";
import type { ToastProps } from "../types";
import { FaInfoCircle } from "react-icons/fa";

type Props = ToastProps;

export default function DefaultSnackbar(props: Props) {
   return (
      <div
         className="flex flex-wrap w-full md:max-w-[380px] items-center justify-between
                    gap-4 rounded-2xl bg-gray-50 shadow-sm
                    border border-gray-200 p-4 animate-slideIn transition-all duration-300
                    hover:shadow-md hover:border-gray-300">
         {/* Left: Icon + Text */}
         <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0">
               <FaInfoCircle className="h-6 w-6 text-gray-500" />
            </div>
            <div>
               <p className="text-sm font-semibold text-gray-900">{props.title}</p>
               <p className="mt-1 text-xs text-gray-700 leading-snug">{props.body}</p>
            </div>
         </div>

         {/* Right: Optional Action Button */}
         {props?.action && (
            <div className="flex-shrink-0">
               <button
                  className="rounded-full bg-gray-600 px-4 py-1.5 text-xs font-semibold
                             text-white hover:bg-gray-700 focus:outline-none
                             focus:ring-2 focus:ring-gray-400 transition-colors"
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
