import React, { useEffect, useRef, useState } from "react";

type Props = {
   defaultValue?: string;
   OptionComponent?: React.ComponentType<{ label: string; value: string }>;
   Trigger: React.ComponentType<{ isShow: boolean; value: string }>;
   options: { value: string; label: any }[];
   onChange?: (value: string) => void;
};
export function Dropdown({ options, Trigger, OptionComponent, onChange, defaultValue }: Props) {
   const [isShow, setToggle] = useState(false);
   const [value, setValue] = useState("");
   const dropdownRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (defaultValue && options?.length) {
         const item = options?.find((item) => item?.value === defaultValue);
         if (item?.value) setValue(item.label);
      }
      return () => {};
   }, [defaultValue]);

   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setToggle(false);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   return (
      <div className="relative" ref={dropdownRef}>
         <button onClick={() => setToggle(!isShow)}>
            <Trigger isShow={isShow} value={value} />
         </button>
         {isShow && (
            <div className="z-10 absolute bg-white divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 max-h-[150px] overflow-y-auto top-9 dropdown-animate">
               {options.map((option) => (
                  <button
                     key={option.value}
                     type="button"
                     className="block"
                     onClick={() => {
                        setValue((_) => {
                           const selectValue = option.value;
                           onChange?.(selectValue);
                           return option.label;
                        });
                        setToggle(false);
                     }}>
                     {OptionComponent ? ( //
                        <OptionComponent label={option.label} value={option.value} />
                     ) : (
                        option.label
                     )}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
}
