import { Helmet } from "react-helmet";
import useUserInfoController from "./user-info.controller";
import type { ReactNode } from "react";
import { Card, Loading, PageHeader } from "@/shared/components";
import { Badge, Button } from "@/shared/ui";
import moment from "moment";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>userInfo</title>
      </Helmet>
      {children}
   </>
);

export default function UserInfoPage() {
   const ctrl = useUserInfoController();
   const user = ctrl.getSingleUser?.data;
   return (
      <HelmetContainer>
         <div className="p-3">
            <PageHeader title="User Info" subtitle="Home / User Info" />
            <Loading loading={ctrl.getSingleUser.isLoading} className="h-[40vh]">
               {user ? (
                  <div className="grid grid-cols-12 gap-3">
                     <div className="col-span-8">
                        <Card
                           heading="Info"
                           extra={
                              user?.isActive ? (
                                 <Badge size="sm" className="bg-[#dbeee7] text-[#11905E]">
                                    ACTIVE
                                 </Badge>
                              ) : (
                                 <Badge size="sm" className="bg-[#f9ded9] text-[#DA2100]">
                                    INACTIVE
                                 </Badge>
                              )
                           }>
                           {/* Body */}
                           <div>
                              <div className="mb-3">
                                 <label className="block text-xs text-gray-500 mb-1">Email</label>
                                 <div className="text-sm text-gray-800">{user?.email}</div>
                              </div>

                              <div className="mb-3">
                                 <label className="block text-xs text-gray-500 mb-1">Role</label>
                                 <div className="text-sm text-gray-800">{user?.role}</div>
                              </div>

                              <div className="mb-3">
                                 <label className="block text-xs text-gray-500 mb-1">Created</label>
                                 <div className="text-sm text-gray-800">{moment(user?.createdAt).format("DD MMM YYYY")}</div>
                              </div>

                              <div className="mb-3">
                                 <label className="block text-xs text-gray-500 mb-1">Updated</label>
                                 <div className="text-sm text-gray-800">{moment(user?.createdAt).format("DD MMM YYYY")}</div>
                              </div>
                           </div>
                        </Card>
                     </div>
                     <div className="col-span-4">
                        <Card heading="Activation">
                           <p className="text-sm text-gray-500">Enable or disable this user’s account access.</p>
                           <div className="flex justify-end">
                              {user?.isActive ? (
                                 <Button type="submit" className="text-xs capitalize bg-gray-500" loading={ctrl.userStatus.isLoading} onClick={() => ctrl.onChangeStatusUser("false")}>
                                    Deactivate
                                 </Button>
                              ) : (
                                 <Button type="submit" className="text-xs capitalize bg-green-500" loading={ctrl.userStatus.isLoading} onClick={() => ctrl.onChangeStatusUser("true")}>
                                    Activate
                                 </Button>
                              )}
                           </div>
                        </Card>
                        <Card heading="Remove Account" className="mt-3">
                           <p className="text-sm text-gray-500">Permanently delete your account and all data.</p>
                           <div className="flex justify-end">
                              <Button type="submit" className="text-xs capitalize bg-red-500">
                                 Remove
                              </Button>
                           </div>
                        </Card>
                     </div>
                  </div>
               ) : (
                  "No User"
               )}
            </Loading>
         </div>
      </HelmetContainer>
   );
}
