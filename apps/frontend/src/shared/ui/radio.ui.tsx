import React, { type JSX } from "react";

const RADIO = {
   accent: {
      primary: "peer-checked:border-primary peer-checked:bg-primary",
      secondary: "peer-checked:border-secondary peer-checked:bg-secondary",
      done: "peer-checked:border-done peer-checked:bg-done",
      error: "peer-checked:border-error peer-checked:bg-error",
      warn: "peer-checked:border-warn peer-checked:bg-warn",
      info: "peer-checked:border-info peer-checked:bg-info",
      dark: "peer-checked:border-dark peer-checked:bg-dark",
   },
};
type FeatureProps = {
   label?: string | JSX.Element;
   accent?: keyof typeof RADIO.accent;
};

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & FeatureProps;

export function Radio({ label, id, className, accent = "primary", ...props }: Props) {
   return (
      <label htmlFor={id} className="flex items-center gap-2 cursor-pointer select-none">
         {/* Hidden native radio */}
         <input type="radio" id={id} className="peer hidden" {...props} />

         {/* Custom circle */}
         <span
            className={`
          relative w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center
          after:content-[''] after:w-2.5 after:h-2.5 after:rounded-full
          after:bg-white after:scale-0 peer-checked:after:scale-100
          after:transition-transform after:duration-200 ${[RADIO.accent[accent]].join(" ")}
        `}
         />
         {/* Label */}
         {label && <span className="text-sm text-gray-900 dark:text-gray-300">{label}</span>}
      </label>
   );
}
