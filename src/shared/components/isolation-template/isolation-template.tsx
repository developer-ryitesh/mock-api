import React, { useState } from "react";

type IsolationTemplateProps<T> = {
   vars: T;
   children: (props: { vars: T; set: (newVars: Partial<T>) => void }) => React.ReactNode;
};

export function IsolationTemplate<T>({ vars: initialVars, children }: IsolationTemplateProps<T>) {
   const [vars, setVars] = useState(initialVars);

   const set = (newVars: Partial<T>) => {
      setVars((prev) => ({ ...prev, ...newVars }));
   };

   return <>{children({ vars, set })}</>;
}
