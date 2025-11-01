import { PageHeader } from "@/shared/components";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Notifications</title>
      </Helmet>
      {children}
   </>
);
export default function NotificationPage() {
   return (
      <HelmetContainer>
         <div className="p-3">
            <PageHeader title="Notification" subtitle="Home / Notification" />
         </div>
      </HelmetContainer>
   );
}
