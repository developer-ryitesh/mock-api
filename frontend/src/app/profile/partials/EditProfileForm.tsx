import { Button, Textarea, TextField } from "@/shared/ui";

export default function EditProfileForm() {
   return (
      <form className="grid grid-cols-12 gap-3">
         <div className="col-span-12">
            <div className="flex justify-between items-center">
               <span className="font-medium text-[17px]">Edit Profile</span>
            </div>
         </div>
         <div className="col-span-12 sm:col-span-6">
            <TextField label="First Name" name="first_name" />
         </div>
         <div className="col-span-12 sm:col-span-6">
            <TextField label="Last Name" name="last_name" />
         </div>
         <div className="col-span-12">
            <Textarea label="Bio" name="bio" />
         </div>
         <div className="col-span-12  text-end">
            <Button type="submit">Update Profile</Button>
         </div>
      </form>
   );
}
