import { Card, Loading, PageHeader } from "@/shared/components";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet";
import useNotificationController from "./notification.controller";
import moment from "moment";
import { Badge } from "@/shared/ui";
import React from "react";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Notifications</title>
      </Helmet>
      {children}
   </>
);
export default function NotificationPage() {
   const ctrl = useNotificationController();
   const notifications = ctrl.notifications.data;
   return (
      <HelmetContainer>
         <div className="p-3">
            <PageHeader title="Notification" subtitle="Home / Notification" />
            <div className="grid grid-cols-12">
               <Card className="col-span-12 md:col-span-7 flex-col h-[74vh] lg:h-[76vh]">
                  {notifications?.map((notification, idx) => (
                     <button key={`notification-${idx}`} className="w-full border border-gray-200 rounded-md p-3 bg-white mb-2">
                        <div className="flex items-center justify-between">
                           <h3 className="text-md font-semibold text-gray-800 hover:underline">{notification.title}</h3>
                           {notification.priority === "high" && (
                              <Badge //
                                 size="sm"
                                 variant="outline"
                                 accent="error">
                                 {notification.priority}
                              </Badge>
                           )}
                           {notification.priority === "normal" && (
                              <Badge //
                                 size="sm"
                                 variant="outline"
                                 accent="secondary">
                                 {notification.priority}
                              </Badge>
                           )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 text-start">{notification.body}</p>
                        <div className="flex items-center gap-3">
                           <Badge size="sm" variant="outline">
                              {notification.type}
                           </Badge>
                           <span>•</span>
                           <span className="text-xs">
                              {moment().diff(moment(notification.createdAt), "days") > 1 ? moment(notification.createdAt).format("DD MMM YYYY") : moment(notification.createdAt).fromNow()}
                           </span>
                        </div>
                     </button>
                  ))}
                  {ctrl.notifications.isLoading ? ( //
                     <Loading loading className="h-28 justify-center items-center" />
                  ) : (
                     <React.Fragment>
                        {Boolean(!notifications.length) && (
                           <div className="flex flex-col items-center justify-center space-y-2 py-5 h-56">
                              <img src="/images/no-data.image.svg" alt="no-data" width={100} />
                              <p className="text-xs">No Notifications Yet</p>
                           </div>
                        )}
                     </React.Fragment>
                  )}
               </Card>
            </div>
         </div>
      </HelmetContainer>
   );
}
