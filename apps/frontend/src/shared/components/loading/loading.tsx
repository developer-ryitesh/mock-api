import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React from "react";
import type { IconType } from "react-icons/lib";

type FeaturesProps = {
   loading: Boolean;
   children?: React.ReactNode;
   title?: string;
};

type Props = Omit<IconType, "ref"> & React.SVGProps<SVGSVGElement> & FeaturesProps;

const Loading = React.forwardRef<SVGSVGElement, Props>(({ loading, children, className, title, ...props }) => {
   return loading ? (
      <div className={`${className} bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-400 flex justify-center items-center`}>
         <span>
            <AiOutlineLoading3Quarters {...props} className="spin mx-auto" />
            {title && <small className="text-center">{title}</small>}
         </span>
      </div>
   ) : (
      children
   );
});
Loading.displayName = "Loading";
export { Loading };