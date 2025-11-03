import { Card, PageHeader } from "@/shared/components";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet";
import EditProfileForm from "./partials/EditProfileForm";
import UpdatePasswordForm from "./partials/UpdatePasswordForm";

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
            <div className="grid grid-cols-12 gap-3 mt-4">
               <div className="col-span-12 md:col-span-7">
                  <Card>
                     <EditProfileForm />
                  </Card>
               </div>
               <div className="col-span-12 md:col-span-5">
                  <Card>
                     <UpdatePasswordForm />
                  </Card>
               </div>
            </div>
         </div>
      </HelmetContainer>
   );
}
