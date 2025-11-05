interface InviteUserDTO {
   email: string;
   password: string;
}
interface UserStatusDTO {
   id: string;
   status: "true" | "false";
}
export type { InviteUserDTO, UserStatusDTO };
