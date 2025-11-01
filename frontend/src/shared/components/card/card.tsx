import { cn } from "@/shared/utils";
import type { JSX } from "react";

type FeatureProps = {
   heading?: string | JSX.Element;
   extra?: any;
};
type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & FeatureProps;

export function Card({ children, extra, heading, ...props }: Props) {
   props.className = cn("box-border  bg-white border border-[#DDDDDD] border-[0.5px] rounded-[7px] p-3", props.className);
   return (
      <div {...props}>
         {heading && (
            <div className="flex justify-between items-center">
               <div>{heading}</div>
               <div>{extra}</div>
            </div>
         )}
         {children}
      </div>
   );
}
