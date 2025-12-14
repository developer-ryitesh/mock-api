import { Pagination, type IPagination } from "../pagination/pagination";
import { Skeleton } from "@/shared/ui";
import { useAppRouter } from "@/libs/router/hooks";
import { FaArrowUpShortWide, FaArrowDownWideShort } from "react-icons/fa6";
type Props = {
   height: string;
   loading?: boolean;
   dataList: any[];
   colums?: {
      key: string;
      label: string;
      sort?: boolean;
   }[];
   pagination?: IPagination;
};

function TableLoading({ colums }: { colums: Props["colums"] }) {
   return [1, 2, 3, 4, 5, 6, 7].map((_, idx) => (
      <tr key={`table-loading-tr-${idx + 1}`}>
         {colums?.map((_, colIdx) => (
            <td className="px-6" key={`table-loading-td-${idx + 1}-${colIdx}`}>
               <Skeleton className="h-5 my-2" />
            </td>
         ))}
      </tr>
   ));
}

type Sort = {
   columKey: string;
};
export function SortComponent({ columKey }: Sort) {
   const { queryString } = useAppRouter();
   const { sortBy, order } = queryString.data || {};

   const isActive = sortBy === columKey;
   const isAsc = order === "asc";

   const onToggle = () => {
      const newOrder = isActive ? (isAsc ? "desc" : "asc") : "desc";
      queryString.set({
         sortBy: columKey,
         order: newOrder,
      });
   };

   return (
      <span onClick={onToggle} className="cursor-pointer">
         {isActive ? isAsc ? <FaArrowDownWideShort size={14} /> : <FaArrowUpShortWide size={14} /> : <FaArrowDownWideShort size={14} className="opacity-50" />}
      </span>
   );
}
//onSort && onSort({ key: colum?.key, value: "asc" });

function List({ loading, dataList, colums, pagination, height = "auto" }: Props) {
   return (
      <>
         <div className="relative overflow-auto" style={{ maxHeight: height }}>
            <table className="w-full text-sm text-left rtl:text-right">
               <thead className="text-xs text-gray-700">
                  <tr>
                     {colums?.map((colum) => (
                        <th key={colum.key} scope="col" className="sticky top-0 px-4 py-4 bg-[#f0f0f0] z-10">
                           <div className="flex items-center gap-2">
                              {colum.sort && <SortComponent columKey={colum?.key} />}
                              <span className="text-[11px] font-semibold">{colum?.label}</span>
                           </div>
                        </th>
                     ))}
                  </tr>
               </thead>

               <tbody>
                  {loading ? (
                     <TableLoading colums={colums} />
                  ) : (
                     <>
                        {dataList?.length ? (
                           <>
                              {dataList?.map((data, idx) => (
                                 <tr key={`table-product-${idx}`} className="border border-gray-200">
                                    {colums?.map((col) => (
                                       <td key={`${idx}-${col.key}`} className="px-6 py-2">
                                          {data?.[col?.key]}
                                       </td>
                                    ))}
                                 </tr>
                              ))}
                           </>
                        ) : (
                           <tr>
                              <td colSpan={colums?.length}>
                                 <div className="flex flex-col items-center justify-center space-y-2 py-5 h-56">
                                    <img src="/images/no-data.image.svg" alt="no-data" width={160} />
                                    <p>No data found.</p>
                                 </div>
                              </td>
                           </tr>
                        )}
                     </>
                  )}
               </tbody>
            </table>
         </div>
         {pagination && (
            <div className="mt-2">
               <Pagination {...pagination} />
            </div>
         )}
      </>
   );
}

export function Table(props: Props) {
   return <List {...props} />;
}
