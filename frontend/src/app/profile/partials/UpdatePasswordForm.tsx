import { Button, TextField } from "@/shared/ui";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function UpdatePasswordForm() {
   return (
      <form className="grid grid-cols-12 gap-3 items-center">
         <div className="col-span-12">
            <div className="flex justify-between items-center">
               <span className="font-medium text-[17px]">Update Password</span>
            </div>
         </div>
         <div className="col-span-12">
            <TextField //
               label="Current Password"
               name="currentPassword"
               type={true ? "text" : "password"}
               suffixIcon={<IoEyeOff size={16} />}
            />
         </div>
         <div className="col-span-12">
            <TextField //
               label="New Password"
               name="newPassword"
               type={"text"}
               suffixIcon={<IoEye size={16} />}
            />
         </div>
         <div className="col-span-12 text-end">
            <Button type="submit">Update Password</Button>
         </div>
      </form>
   );
}
