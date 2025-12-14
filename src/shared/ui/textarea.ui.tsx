import React, { type JSX } from "react";
import { cn } from "@/shared/utils";

type FeatureProps = { label?: string | JSX.Element };
export type TextareaProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & FeatureProps;

export function Textarea({ className, label, ...props }: TextareaProps) {
   return (
      <>
         {label && (
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={props.id}>
               {label}
            </label>
         )}
         <textarea
            {...props}
            className={cn(`border-1 border-[#e5e7eb] rounded-[7px] px-[12px] py-[8px] w-full placeholder:text-[14px] text-[14px] disabled:border-gray-200 disabled:bg-gray-50`, className || "")}
         />
      </>
   );
}
