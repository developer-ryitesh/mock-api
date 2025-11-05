import { Card, PageHeader } from "@/shared/components";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet";
import EditProfileForm from "./partials/EditProfileForm";
import UpdatePasswordForm from "./partials/UpdatePasswordForm";
import useProfileController from "./profile.controller";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Profile</title>
      </Helmet>
      {children}
   </>
);
export default function ProfilePage() {
   const ctrl = useProfileController();
   return (
      <HelmetContainer>
         <div className="p-3">
            <PageHeader title="Profile" subtitle="Home / Profile" />
            <div className="grid grid-cols-12 gap-3 mt-4">
               <div className="col-span-12 md:col-span-7">
                  <Card>
                     <EditProfileForm onSubmit={ctrl.onProfileUpdate} loading={ctrl.updateProfile.isLoading} patchValues={ctrl.session.data?.profile} />
                  </Card>
               </div>
               <div className="col-span-12 md:col-span-5">
                  <Card>
                     <UpdatePasswordForm onSubmit={ctrl.onPasswordUpdate} loading={ctrl.updatePassword.isLoading} />
                  </Card>
               </div>
            </div>
         </div>
      </HelmetContainer>
   );
}
