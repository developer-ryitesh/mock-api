import type { IFormComponent } from "@/libs/formik";
import { Button, Textarea, TextField } from "@/shared/ui";
import { Form, Formik } from "formik";
import type { ISession } from "../types/profile.type";

type Props = IFormComponent<ISession["profile"]>;
export default function EditProfileForm({ onSubmit, patchValues, loading }: Props) {
   const [first_name, last_name] = patchValues?.fullName?.split(" ") || "";
   const fields = {
      first_name: first_name || "",
      last_name: last_name || "",
      bio: patchValues?.bio || "",
   };
   return (
      <Formik initialValues={fields} onSubmit={onSubmit}>
         {(formik) => (
            <Form className="grid grid-cols-12 gap-3">
               <div className="col-span-12">
                  <div className="flex justify-between items-center">
                     <span className="font-medium text-[17px]">Edit Profile</span>
                  </div>
               </div>
               <div className="col-span-12 sm:col-span-6">
                  <TextField {...formik.getFieldProps("first_name")} label="First Name" />
               </div>
               <div className="col-span-12 sm:col-span-6">
                  <TextField {...formik.getFieldProps("last_name")} label="Last Name" />
               </div>
               <div className="col-span-12">
                  <Textarea {...formik.getFieldProps("bio")} label="Bio" />
               </div>
               <div className="col-span-12  text-end">
                  <Button type="submit" loading={loading}>
                     Update Profile
                  </Button>
               </div>
            </Form>
         )}
      </Formik>
   );
}
