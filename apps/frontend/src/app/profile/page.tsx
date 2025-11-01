import { PageHeader } from "@/shared/components";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Profile</title>
      </Helmet>
      {children}
   </>
);
export default function ProfilePage() {
   return (
      <HelmetContainer>
         <div className="p-3">
            <PageHeader title="Profile" subtitle="Home / Profile" />
         </div>
      </HelmetContainer>
   );
}
