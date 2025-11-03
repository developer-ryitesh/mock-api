import { useEffect, useState, type JSX } from "react";

type Props = {
   sec?: number;
   callback?: () => void;
   Label?: (time: string) => JSX.Element;
   Component?: (reset: (val: number) => void) => JSX.Element;
};

export function DigitalTimer({ sec = 120, callback, Label, Component }: Props) {
   const [timer, setTimer] = useState<number>(sec);
   const seconds = Math.floor(timer % 60);
   const minutes = Math.floor((timer / 60) % 60);
   const hours = Math.floor((timer / 3600) % 24);

   const formattedTime = [hours, minutes, seconds].map((val) => val.toString().padStart(2, "0")).join(":");

   useEffect(() => {
      if (timer === 0) {
         callback?.();
         return;
      }

      const tiktik = setTimeout(() => {
         setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(tiktik);
   }, [timer]);

   const resetTimer = (val: number) => setTimer(val);

   if (timer === 0 && Component) {
      return Component(resetTimer);
   }

   return Label ? Label(formattedTime) : <span>{formattedTime}</span>;
}
