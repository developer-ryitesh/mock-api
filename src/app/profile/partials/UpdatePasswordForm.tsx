import { TextFieldFormik, type IFormComponent } from "@/libs/formik";
import { updatePasswordSchema } from "@/modules/(user)/validators";
import { Button } from "@/shared/ui";
import { Form, Formik } from "formik";
import { IoEye, IoEyeOff } from "react-icons/io5";

type Props = IFormComponent<any>;
export default function UpdatePasswordForm({ onSubmit, loading }: Props) {
   const fields = { oldPassword: "", newPassword: "" };
   return (
      <Formik initialValues={fields} onSubmit={onSubmit} validationSchema={updatePasswordSchema}>
         <Form className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-12">
               <TextFieldFormik //
                  name="oldPassword"
                  label="Current Password"
                  type={true ? "text" : "password"}
                  suffixIcon={<IoEyeOff size={16} />}
               />
            </div>
            <div className="col-span-12">
               <TextFieldFormik //
                  label="New Password"
                  name="newPassword"
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
      </Formik>
   );
}
