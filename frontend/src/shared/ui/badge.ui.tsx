import * as React from "react";
import { cn } from "@/shared/utils/index";

const BADGE = {
   variants: {
      default: {
         primary: "bg-primary text-foreground",
         secondary: "bg-secondary text-white",
         done: "bg-done text-white",
         error: "bg-error text-white",
         warn: "bg-warn text-black",
         info: "bg-info text-white",
         dark: "bg-dark text-white",
      },
      outline: {
         primary: "bg-transparent text-primary border border-primary",
         secondary: "bg-transparent text-secondary border border-secondary",
         done: "bg-transparent text-done border border-done",
         error: "bg-transparent text-error border border-error",
         warn: "bg-transparent text-warn border border-warn",
         info: "bg-transparent text-info border border-info",
         dark: "bg-transparent text-dark border border-dark",
      },
   },
   size: {
      sm: "px-2 py-0.5 text-xs rounded-md",
      md: "px-3 py-1 text-sm rounded-md",
      lg: "px-4 py-1.5 text-base rounded-lg",
      xl: "px-5 py-2 text-lg rounded-xl",
   },
};
const baseClass =
   "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden";

type Props = React.ComponentProps<"span"> & {
   accent?: keyof typeof BADGE.variants.default;
   variant?: keyof typeof BADGE.variants;
   size?: keyof typeof BADGE.size;
};

function Badge({
   className, //
   accent = "primary",
   variant = "default",
   size = "md",
   ...props
}: Props) {
   return (
      <span //
         data-slot="badge"
         className={cn([baseClass, BADGE.size[size], BADGE.variants[variant][accent]].join(" "), className)}
         {...props}
      />
   );
}

export { Badge };
