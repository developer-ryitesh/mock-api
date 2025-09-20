export interface InviteUserDTO {
  email: string;
  password: string;
}

export const STATUS = { false: "false", true: "true" };
export interface ChangeUserStatusDTO {
  id: string;
  status: keyof typeof STATUS;
}

export interface DeleteUsersDTO {
  id: string;
}
