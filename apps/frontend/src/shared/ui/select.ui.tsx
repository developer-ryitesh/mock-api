import { cn } from "@/shared/utils";
import type { ComponentProps, JSX } from "react";

const SIZE_TYPE = {
   sm: "px-2 py-1 text-sm rounded-md",
   md: "px-3 py-2 text-base rounded-lg",
   lg: "px-4 py-3 text-lg rounded-lg",
   xl: "px-5 py-4 text-xl rounded-xl",
};

type FeatureProps = {
   label?: string | JSX.Element;
   eleSize?: keyof typeof SIZE_TYPE;
   prefixIcon?: JSX.Element;
   suffixIcon?: JSX.Element;
   instruction?: string | JSX.Element;
   options: ComponentProps<"option">[];
   placeholder?: string;
};

export type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & FeatureProps;

export function Select({ label, eleSize, prefixIcon, suffixIcon, instruction, children, placeholder = "Select Option", options, ...props }: SelectProps) {
   const hasIcon = Boolean(prefixIcon || suffixIcon);
   const baseClass = cn(
      `w-full border border-gray-300 bg-white text-gray-800 placeholder-gray-400
       focus:border-blue-500 focus-within:border-blue-500 focus-within:ring-2 
       focus-within:ring-blue-200 transition-all duration-200 appearance-none
       ${SIZE_TYPE[eleSize || "md"]}`,
      props.className
   );

   return (
      <>
         {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
         {hasIcon ? (
            <>
               <div className={`flex w-full items-center gap-2 ${baseClass}`}>
                  {prefixIcon && prefixIcon}
                  <select className="flex-1 focus:outline-0 bg-transparent" {...props}>
                     {placeholder && (
                        <option value="" disabled>
                           {placeholder}
                        </option>
                     )}
                     {options.map((option) => (
                        <option key={`${option.value}`} value={option.value}>
                           {option.label}
                        </option>
                     ))}
                  </select>
                  {suffixIcon && suffixIcon}
               </div>
               {instruction && <p className="mt-1 text-xs text-gray-500">{instruction}</p>}
            </>
         ) : (
            <div>
               <select className={baseClass} {...props}>
                  {placeholder && (
                     <option value="" disabled>
                        {placeholder}
                     </option>
                  )}
                  {options.map((option) => (
                     <option key={`${option.value}`} value={option.value}>
                        {option.label}
                     </option>
                  ))}
               </select>
               {instruction && <p className="mt-1 text-xs text-gray-500">{instruction}</p>}
            </div>
         )}
      </>
   );
}
