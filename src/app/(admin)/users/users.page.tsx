import { Helmet } from "react-helmet";
import useUsersController from "./users.controller";
import type { ReactNode } from "react";
import { Card, PageHeader } from "@/shared/components";
import InviteUserForm from "./partials/InviteUserForm";
import { Table } from "@/shared/components/table/table";
import { Badge, Button } from "@/shared/ui";
import { Link } from "react-router";
import moment from "moment";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>users</title>
      </Helmet>
      {children}
   </>
);

export default function UsersPage() {
   const ctrl = useUsersController();
   return (
      <HelmetContainer>
         <div className="p-3">
            <PageHeader
               title="Users"
               subtitle="Home / Users"
               extra={
                  <InviteUserForm //
                     loading={ctrl.inviteUser.isLoading}
                     onSubmit={ctrl.onInviteUser}
                     ModalButton={({ onOpen }) => (
                        <Button type="button" onClick={onOpen}>
                           Invite User
                        </Button>
                     )}
                  />
               }
            />

            <Card>
               <Table
                  height="70vh"
                  loading={ctrl.getUsers.isLoading}
                  colums={[
                     { label: "#id", key: "id" },
                     { label: "Email", key: "email" },
                     { label: "Role", key: "role" },
                     { label: "Active", key: "isActive" },
                     { label: "Created At", key: "createdAt" },
                     { key: "more", label: "" },
                  ]}
                  dataList={ctrl.getUsers.data.map((user) => {
                     return {
                        id: <span className="text-[11px] font-normal">{user.id}</span>,
                        email: <span className="text-[11px] font-normal">{user.email}</span>,
                        role: <span className="text-[11px] font-normal">{user.role}</span>,
                        isActive: user.isActive ? ( //
                           <Badge size="sm" className="bg-[#dbeee7] text-[#11905E]">
                              Yes
                           </Badge>
                        ) : (
                           <Badge size="sm" className="bg-[#f9ded9] text-[#DA2100]">
                              No
                           </Badge>
                        ),
                        createdAt: <span className="text-[11px] font-normal">{moment(user?.createdAt).format("DD MMM YYYY")}</span>,
                        more: (
                           <>
                              <Link to={user.id} className="text-sm underline">
                                 View
                              </Link>
                           </>
                        ),
                     };
                  })}
               />
            </Card>
         </div>
      </HelmetContainer>
   );
}
