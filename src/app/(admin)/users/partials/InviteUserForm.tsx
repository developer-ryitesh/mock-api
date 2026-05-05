import { ErrorMessageFormik, type IFormComponent } from "@/libs/formik";
import { Button, TextField } from "@/shared/ui";
import { useRef, useState, type ComponentType } from "react";
import { Form, Formik } from "formik";
import { Card, Modal, type ModalRefType } from "@/shared/components";
import type { ISessionModel } from "@/modules/(user)/models";
import { inviteUserSchema } from "@/modules/(user)/validators";

type Props = IFormComponent<ISessionModel> & {
   ModalButton: ComponentType<{ onOpen: () => void }>;
};

export default function InviteUserForm({ loading, onSubmit, ModalButton }: Props) {
   const modalRef = useRef<ModalRefType>(null);
   const [fields] = useState({
      email: "",
      password: "",
   });

   return (
      <div>
         <ModalButton onOpen={() => modalRef.current?.setToggle(true)} />
         <Modal ref={modalRef} size="lg" className="p-2 rounded-lg">
            <Formik
               initialValues={fields}
               onSubmit={(values, formikHelpers) => {
                  formikHelpers.callback = () => {
                     formikHelpers.resetForm();
                     modalRef.current?.setToggle(false);
                  };
                  onSubmit({ ...values }, formikHelpers);
               }}
               validationSchema={inviteUserSchema}>
               {(formik) => (
                  <Form>
                     <Card heading="Invite User" className="border-0">
                        <div className="flex flex-col gap-2">
                           <div>
                              <TextField {...formik.getFieldProps("email")} label="Email*" name="email" placeholder="Email" />
                              <ErrorMessageFormik name="email" />
                           </div>
                           <div>
                              <TextField {...formik.getFieldProps("password")} label="Password*" name="password" placeholder="Password" />
                              <ErrorMessageFormik name="password" />
                           </div>
                           <div className="flex justify-end items-center gap-3 mt-2">
                              <Button type="button" size="sm" variant="outline" accent="error" onClick={() => modalRef.current?.setToggle(false)}>
                                 Close
                              </Button>
                              <Button type="submit" size="sm" loading={loading}>
                                 Invite
                              </Button>
                           </div>
                        </div>
                     </Card>
                  </Form>
               )}
            </Formik>
         </Modal>
      </div>
   );
}
