import User, { IUserModel } from "../../server/app/(user)/model/user.model";
import bcrypt from "bcrypt";

export default async function UsersSeed() {
   const password = await bcrypt.hash("Root@123", 10);
   await User.insertMany([
      { email: "ryitesh94@gmail.com", password: password, isActive: true, role: "ADMIN" },
      //
      { email: "ritesh@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "aman@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "rahul@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "sachin@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "vikas@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "arjun@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "rohit@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "deepak@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "manish@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "nitesh@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "praveen@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "sunil@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "anil@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "kiran@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "pankaj@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "lokesh@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "suresh@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "mohit@youpmail.com", password: password, isActive: true, role: "USER" },
      { email: "ravi@youpmail.com", password: password, isActive: true, role: "USER" },
   ] as IUserModel[]);
}
