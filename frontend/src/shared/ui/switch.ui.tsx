import React, { type JSX } from "react";

const SWITCH = {
   eleSize: {
      sm: "w-9 h-5 after:h-4 after:w-4 after:top-[2px] after:start-[2px]",
      md: "w-11 h-6 after:h-5 after:w-5 after:top-[2px] after:start-[2px]",
      lg: "w-15 h-8 after:h-6 after:w-6 after:top-[3px] after:start-[4px]",
   },
   accent: {
      primary: "bg-primary text-foreground",
      secondary: "bg-secondary text-white",
      done: "bg-done text-white",
      error: "bg-error text-white",
      warn: "bg-warn text-black",
      info: "bg-info text-white",
      dark: "bg-dark text-white",
   },
};

type FeatureProps = {
   label?: string | JSX.Element;
   eleSize?: keyof typeof SWITCH.eleSize;
   accent?: keyof typeof SWITCH.accent;
};
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & FeatureProps;

export function Switch({ label, eleSize = "md", accent = "primary", ...props }: Props) {
   return (
      <label className="inline-flex items-center me-5 cursor-pointer">
         <input type="checkbox" className="sr-only peer" {...props} />
         <div
            className={`relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-transparent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:${SWITCH.accent[accent]}`}></div>
         {label && <span className="ms-3 text-sm font-medium text-gray-900">{label}</span>}
      </label>
   );
}
