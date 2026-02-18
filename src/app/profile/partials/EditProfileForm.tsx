import { TextareaFormik, TextFieldFormik, type IFormComponent } from "@/libs/formik";
import type { ISessionModel } from "@/modules/(user)/models";
import { updateProfileSchema } from "@/modules/(user)/validators";
import { Button } from "@/shared/ui";
import { Form, Formik } from "formik";

type Props = IFormComponent<ISessionModel["profile"]>;

export default function EditProfileForm({ onSubmit, patchValues, loading }: Props) {
   const [name, lastname] = patchValues?.fullName?.split(" ") || "";
   const fields = {
      name: name || "",
      lastname: lastname || "",
      bio: patchValues?.bio || "",
   };
   return (
      <Formik //
         initialValues={fields}
         onSubmit={onSubmit}
         validationSchema={updateProfileSchema}>
         <Form className="grid grid-cols-12 gap-3">
            <div className="col-span-12 sm:col-span-6">
               <TextFieldFormik name="name" label="First Name" />
            </div>
            <div className="col-span-12 sm:col-span-6">
               <TextFieldFormik name="lastname" label="Last Name" />
            </div>
            <div className="col-span-12">
               <TextareaFormik name="bio" label="Bio" />
            </div>
            <div className="col-span-12 text-end">
               <Button type="submit" loading={loading}>
                  Update Profile
               </Button>
            </div>
         </Form>
      </Formik>
   );
}
