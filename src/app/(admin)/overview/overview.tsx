import { useAppSelector } from "@/libs/redux/hooks";
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
   const { data } = useAppSelector((state) => state.user.dashboard);
   return (
      <HelmetContainer>
         <div className="p-3 md:w-[90%]">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
               {/* Users */}
               {Boolean(data?.users.active) && (
                  <Card //
                     className="p-4"
                     heading={<span className="block text-[13px] text-[#6B6767]">Active Users</span>}>
                     <span className="text-[23px] font-semibold block mt-3">{data?.users.active}</span>
                  </Card>
               )}
               {Boolean(data?.users.inactive) && (
                  <Card //
                     className="p-4"
                     heading={<span className="block text-[13px] text-[#6B6767]">Inactive Users</span>}>
                     <span className="text-[23px] font-semibold block mt-3">{data?.users.inactive}</span>
                  </Card>
               )}
               {Boolean(data?.users.inactive) && (
                  <Card //
                     className="p-4"
                     heading={<span className="block text-[13px] text-[#6B6767]">Total Users</span>}>
                     <span className="text-[23px] font-semibold block mt-3">{data?.users.total}</span>
                  </Card>
               )}
            </div>
         </div>
      </HelmetContainer>
   );
}
