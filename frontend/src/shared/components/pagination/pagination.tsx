import { Select } from "@/shared/ui";
import { cn } from "@/shared/utils";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export type IQueryRecord = Record<any, any>;

export type IPagination = {
   limit: number;
   currentPage: number;
   totalPages: number;
   onPageChange: (page: IQueryRecord) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange, limit }: IPagination) {
   currentPage = isNaN(currentPage) ? 1 : currentPage;
   const isFirstPage = currentPage === 1;
   const isLastPage = currentPage === totalPages;

   const pagesToShow = (): (number | string)[] => {
      const pages: (number | string)[] = [];

      if (totalPages <= 5) {
         for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
         if (currentPage <= 2) {
            pages.push(1, 2, 3, "...", totalPages);
         } else if (currentPage >= totalPages - 2) {
            pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
         } else {
            pages.push(1, "...", currentPage, "...", totalPages);
         }
      }
      return pages;
   };

   return (
      <div className="flex justify-between items-center">
         <div>
            <Select
               placeholder="limit"
               value={limit}
               onChange={(e) => onPageChange({ limit: e.target.value })}
               options={[
                  { value: 10, label: "10" },
                  { value: 30, label: "30" },
                  { value: 40, label: "40" },
                  { value: 50, label: "50" },
               ]}
            />
         </div>
         <div className="flex items-center gap-1 text-sm">
            <React.Fragment>
               {/* <Button //
                  onClick={() => onPageChange(1)}
                  Icon={ChevronsLeftIcon}
               /> */}
               <Button //
                  onClick={() => onPageChange({ page: currentPage - 1 })}
                  Icon={FaChevronLeft}
                  disabled={isFirstPage}
               />
            </React.Fragment>

            {pagesToShow().map((page, index) =>
               typeof page === "number" ? (
                  <Button //
                     key={index}
                     onClick={() => onPageChange({ page: page })}
                     active={page === currentPage}>
                     {page}
                  </Button>
               ) : (
                  <span key={index} className="p-[8px]">
                     {page}
                  </span>
               )
            )}
            <Button //
               onClick={() => onPageChange({ page: currentPage + 1 })}
               Icon={FaChevronRight}
               disabled={isLastPage}
            />
            {/* <Button //
                     onClick={() => onPageChange(totalPages)}
                     Icon={ChevronsRightIcon}
                  /> */}
         </div>
      </div>
   );
}

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
   Icon?: any;
   active?: boolean;
};
const Button = ({ children, Icon, active, ...props }: Props) => {
   const activeCss = active ? " bg-[#18c192] text-white" : "";
   props.className = cn("border h-[30px] w-[30px] text-[10px] cursor-pointer font-medium disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed", props.className + activeCss);
   return (
      <button {...props}>
         {children}
         {Icon && <Icon size={12} className="mx-auto" />}
      </button>
   );
};
