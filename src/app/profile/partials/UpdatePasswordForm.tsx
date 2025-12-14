import type { IFormComponent } from "@/libs/formik";
import { Button, TextField } from "@/shared/ui";
import { Form, Formik } from "formik";
import { IoEye, IoEyeOff } from "react-icons/io5";

type Props = IFormComponent<any>;
export default function UpdatePasswordForm({ onSubmit, loading }: Props) {
   const fields = { oldPassword: "", newPassword: "" };
   return (
      <Formik initialValues={fields} onSubmit={onSubmit}>
         {(formik) => (
            <Form className="grid grid-cols-12 gap-3 items-center">
               <div className="col-span-12">
                  <div className="flex justify-between items-center">
                     <span className="font-medium text-[17px]">Update Password</span>
                  </div>
               </div>
               <div className="col-span-12">
                  <TextField //
                     {...formik.getFieldProps("oldPassword")}
                     label="Current Password"
                     type={true ? "text" : "password"}
                     suffixIcon={<IoEyeOff size={16} />}
                  />
               </div>
               <div className="col-span-12">
                  <TextField //
                     label="New Password"
                     {...formik.getFieldProps("newPassword")}
                     type={"text"}
                     suffixIcon={<IoEye size={16} />}
                  />
               </div>
               <div className="col-span-12 text-end">
                  <Button type="submit" loading={loading}>
                     Update Password
                  </Button>
               </div>
            </Form>
         )}
      </Formik>
   );
}
