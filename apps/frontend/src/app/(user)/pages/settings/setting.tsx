import { PageHeader } from "@/shared/components";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Settings</title>
      </Helmet>
      {children}
   </>
);
export default function SettingsPage() {
   return (
      <HelmetContainer>
         <div className="p-3">
            <PageHeader title="Settings" subtitle="Home / Settings" />
         </div>
      </HelmetContainer>
   );
}
