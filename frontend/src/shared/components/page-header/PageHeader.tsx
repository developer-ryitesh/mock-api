import type { JSX } from "react";
import { Link } from "react-router";
import { IoMdArrowBack } from "react-icons/io";

type props = {
   title: string;
   subtitle?: string;
   extra?: JSX.Element;
};

function PageHeader({ subtitle, title, extra }: props) {
   return (
      <div className="flex justify-between">
         <div className="flex gap-3 items-center">
            <Link to="../" replace>
               <IoMdArrowBack size={20} className="cursor-pointer" />
            </Link>
            <div>
               <span className="text-[17px] block font-medium">{title}</span>
               {subtitle && ( //
                  <span className="text-[12px] block text-[#515151] font-normal">{subtitle}</span>
               )}
            </div>
         </div>
         <div>{extra ? extra : ""}</div>
      </div>
   );
}
export { PageHeader };
