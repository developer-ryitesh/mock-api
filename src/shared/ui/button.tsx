import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "../utils";
import { useRef } from "react";
import { Modal, type ModalRefType } from "../components";

const BUTTON = {
   variants: {
      default: {
         primary: "bg-primary text-foreground",
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
      xs: "px-2 py-1 text-xs rounded",
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-4 py-2 text-base rounded-lg",
      lg: "px-5 py-2.5 text-lg rounded-lg",
      xl: "px-6 py-3 text-xl rounded-xl",
   },
   disabled: "opacity-35 cursor-not-allowed",
};

type FeatureProps = {
   loading?: boolean;
   accent?: keyof typeof BUTTON.variants.default;
   size?: keyof typeof BUTTON.size;
   variant?: keyof typeof BUTTON.variants;
   confirm?: {
      title: string;
      description: string;
   };
};

type Props = React.ComponentProps<"button"> & FeatureProps;

export function Button({
   accent = "primary", //
   variant = "default",
   size = "md",
   loading = false,
   children,
   className,
   confirm,
   disabled,
   ...props
}: Props) {
   const modalRef = useRef<ModalRefType>(null);
   const isDisabled = disabled || loading;

   const baseClasses = cn(
      "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all outline-none cursor-pointer",
      BUTTON.variants[variant][accent],
      BUTTON.size[size],
      isDisabled && BUTTON.disabled,
      className
   );

   if (confirm) {
      const { onClick, ...rest } = props;

      return (
         <>
            <button type="button" className={baseClasses} disabled={isDisabled} onClick={() => modalRef.current?.setToggle(true)} {...rest}>
               {children}
            </button>

            <Modal ref={modalRef}>
               <div className="p-4">
                  <div className="text-left">
                     <h3 className="text-lg font-medium text-gray-900">{confirm.title}</h3>
                     <p className="mt-2 text-sm text-gray-500">{confirm.description}</p>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                     <Button type="button" size="sm" variant="outline" accent="secondary" onClick={() => modalRef.current?.setToggle(false)}>
                        Cancel
                     </Button>

                     <Button
                        type="button"
                        size="sm"
                        accent={accent}
                        loading={loading}
                        onClick={async (event) => {
                           if (onClick) await onClick(event);
                           // modalRef.current?.setToggle(false);
                        }}>
                        Ok
                     </Button>
                  </div>
               </div>
            </Modal>
         </>
      );
   }

   return (
      <button className={baseClasses} disabled={isDisabled} {...props}>
         {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
         {children}
      </button>
   );
}
