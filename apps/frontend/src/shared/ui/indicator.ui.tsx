import type { ComponentProps } from "react";
import { cn } from "../utils";

const colors = {
   primary: "bg-primary",
   secondary: "bg-secondary",
   done: "bg-done",
   error: "bg-error",
   warn: "bg-warn",
   info: "bg-info",
   dark: "bg-dark",
};

type Props = ComponentProps<"span"> & {
   accent?: keyof typeof colors;
   label?: string;
};

export function Indicator({ accent = "primary", label, children, className, ...props }: Props) {
   return (
      <div className="flex items-center gap-2">
         <span //
            className={cn(`flex rounded-full h-3 w-3 ${[colors[accent]].join(" ")}`, className)}
            {...props}
         />
         {label && <span>{label}</span>}
      </div>
   );
}
