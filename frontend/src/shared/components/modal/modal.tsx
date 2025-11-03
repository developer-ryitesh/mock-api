import React from "react";

type Props = {
   children: React.ReactNode;
   heading?: string;
   className?: string;
   confirmType?: boolean;
   isFragment?: boolean;
   Trigger?: React.ComponentType<{ setToggle: React.Dispatch<React.SetStateAction<boolean>> }>;
};
type ModalRefType = {
   setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
// @ts-ignore
const Modal = React.forwardRef(({ children, heading, className, confirmType, isFragment, Trigger }: Props, ref) => {
   const [isOpen, setToggle] = React.useState(false);
   console.log(isOpen);

   React.useImperativeHandle(ref, () => ({ setToggle }), []);

   if (isFragment) {
      return children;
   }
   return (
      <React.Fragment>
         {Trigger && <Trigger setToggle={setToggle} />}
         <div>{children}</div>
      </React.Fragment>
   );
});

export { type ModalRefType, Modal };
