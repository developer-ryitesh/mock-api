import { useEffect, type JSX } from "react";

export type TimerEventType = {
   target: {
      name: string;
      value: number;
   };
};

type Props = {
   name: string;
   value?: number;
   onChange?: (e: TimerEventType) => void;
   callback?: () => void;
   Trigger?: (reset: (val: number) => void) => JSX.Element;
   Render?: (time: string) => JSX.Element;
};

export function TimerField({ value: time = 120, name, Render, onChange, callback, Trigger }: Props) {
   const seconds = Math.floor(time % 60);
   const minutes = Math.floor((time / 60) % 60);
   const hours = Math.floor((time / 3600) % 24);

   const formattedTime = [hours, minutes, seconds].map((val) => val.toString().padStart(2, "0")).join(":");

   useEffect(() => {
      if (time <= 0) {
         callback?.();
         return;
      }

      const tiktik = setTimeout(() => {
         onChange?.({
            target: { name, value: time - 1 },
         });
      }, 1000);

      return () => clearTimeout(tiktik);
   }, [time]);

   const resetTimer = (val: number) => {
      onChange?.({
         target: { name, value: val },
      });
   };

   if (time <= 0 && Trigger) {
      return Trigger(resetTimer);
   }

   return Render ? Render(formattedTime) : formattedTime;
}
