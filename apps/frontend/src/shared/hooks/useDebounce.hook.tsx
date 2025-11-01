import React, { useEffect, useState } from "react";

type Props = {
   callback: (value: string) => void;
   time: number;
};
type STATUS = "RESET" | "SEARCHING" | "DONE" | "INITIAL";
export function useDebounce(props: Props) {
   const [searchKey, setSearchKey] = useState("");
   const [status, setStatus] = useState<STATUS>("INITIAL");

   const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStatus(e.target.value ? "SEARCHING" : "RESET");
      setSearchKey(e.target.value);
   };

   useEffect(() => {
      const handler =
         searchKey &&
         setTimeout(() => {
            props.callback(searchKey);
            setStatus("DONE");
         }, props.time);

      return () => {
         clearTimeout(handler);
      };
   }, [searchKey]);
   return { searchKey, onSearchChange, status };
}
