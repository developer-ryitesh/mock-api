import { Card } from "@/shared/components";
import { Badge } from "@/shared/ui";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Overview</title>
      </Helmet>
      {children}
   </>
);

export default function OverviewPage() {
   return (
      <HelmetContainer>
         <div className="p-3 md:w-[90%]">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
               {/* Users */}
               <Card //
                  className="p-4"
                  heading={<span className="block text-[13px] text-[#6B6767]">Users</span>}>
                  <span className="text-[23px] font-semibold block mt-3">453</span>
                  <div className="flex items-center gap-2 mt-3">
                     <Badge //
                        className="bg-[#DBEEE7] text-[#11905E] text-[10px] rounded-[2px]">
                        +17%
                     </Badge>{" "}
                     <span className="text-[10px] font-normal">/ Month</span>
                  </div>
               </Card>

               <Card //
                  className="p-4"
                  heading={<span className="block text-[13px] text-[#6B6767]">Users</span>}>
                  <span className="text-[23px] font-semibold block mt-3">453</span>
                  <div className="flex items-center gap-2 mt-3">
                     <Badge //
                        className="bg-[#DBEEE7] text-[#11905E] text-[10px] rounded-[2px]">
                        +17%
                     </Badge>{" "}
                     <span className="text-[10px] font-normal">/ Month</span>
                  </div>
               </Card>

               <Card //
                  className="p-4"
                  heading={<span className="block text-[13px] text-[#6B6767]">Users</span>}>
                  <span className="text-[23px] font-semibold block mt-3">453</span>
                  <div className="flex items-center gap-2 mt-3">
                     <Badge //
                        className="bg-[#DBEEE7] text-[#11905E] text-[10px] rounded-[2px]">
                        +17%
                     </Badge>{" "}
                     <span className="text-[10px] font-normal">/ Month</span>
                  </div>
               </Card>
            </div>
         </div>
      </HelmetContainer>
   );
}
