import HttpClient from "@/libs/interceptors";
import AuthRepository from "@/modules/(auth)/repositories/auth.repository";
import AuthService from "@/modules/(auth)/services/auth.service";
import UserService from "@/modules/(user)/services/user.service";
import UserRepository from "@/modules/(user)/repositories/user.repository";
import NotificationService from "@/modules/(notification)/services/notification.service";
import NotificationRepository from "@/modules/(notification)/repositories/notification.repository";

export const auth = new AuthService(new AuthRepository(new HttpClient()));
export const user = new UserService(new UserRepository(new HttpClient()));
export const notification = new NotificationService(new NotificationRepository(new HttpClient()));
