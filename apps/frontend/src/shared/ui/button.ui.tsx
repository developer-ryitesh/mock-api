import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "../utils";

const BUTTON = {
   variants: {
      default: {
         primary: "bg-primary text-foreground hover:bg-primary",
         secondary: "bg-secondary text-white hover:bg-gray-600",
         done: "bg-done text-white hover:bg-green-600",
         error: "bg-error text-white hover:bg-red-600",
         warn: "bg-warn text-black hover:bg-yellow-600",
         info: "bg-info text-white hover:bg-sky-600",
         dark: "bg-dark text-white hover:bg-gray-800",
      },
      outline: {
         primary: "bg-transparent text-primary border border-primary hover:bg-primary hover:text-foreground",
         secondary: "bg-transparent text-secondary border border-secondary hover:bg-secondary hover:text-white",
         done: "bg-transparent text-done border border-done hover:bg-done hover:text-white",
         error: "bg-transparent text-error border border-error hover:bg-error hover:text-white",
         warn: "bg-transparent text-warn border border-warn hover:bg-warn hover:text-black",
         info: "bg-transparent text-info border border-info hover:bg-info hover:text-white",
         dark: "bg-transparent text-dark border border-dark hover:bg-dark hover:text-white",
      },
      link: {
         primary: "text-primary hover:underline hover:text-primary/80",
         secondary: "text-secondary hover:underline hover:text-secondary/80",
         done: "text-done hover:underline hover:text-done/80",
         error: "text-error hover:underline hover:text-error/80",
         warn: "text-warn hover:underline hover:text-warn/80",
         info: "text-info hover:underline hover:text-info/80",
         dark: "text-dark hover:underline hover:text-dark/80",
      },
   },
   size: {
      xs: "px-2 py-1 text-xs rounded", // extra small
      sm: "px-3 py-1.5 text-sm rounded-md", // small
      md: "px-4 py-2 text-base rounded-lg", // medium (default)
      lg: "px-5 py-2.5 text-lg rounded-lg", // large
      xl: "px-6 py-3 text-xl rounded-xl", // extra large
   },
   disabled: "opacity-35 cursor-not-allowed",
};

type FeatureProps = {
   loading?: boolean;
   accent?: keyof typeof BUTTON.variants.default;
   size?: keyof typeof BUTTON.size;
   variant?: keyof typeof BUTTON.variants;
};

type Props = React.ComponentProps<"button"> & FeatureProps;
export function Button({
   accent = "primary", //
   variant = "default",
   size = "md",
   loading,
   children,
   className,
   ...props
}: Props) {
   if (loading) {
      props.disabled = true;
   }
   return (
      <button
         className={cn(
            `inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all outline-none cursor-pointer ${[
               BUTTON.variants[variant][accent],
               BUTTON.size[size],
               props.disabled ? BUTTON.disabled : "",
            ].join(" ")}`,
            className
         )}
         {...props}>
         {loading && <AiOutlineLoading3Quarters className="spin" />} {children}
      </button>
   );
}
