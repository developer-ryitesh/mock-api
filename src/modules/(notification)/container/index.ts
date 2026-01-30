import HttpClient from "@/libs/interceptors";
import NotificationRepository from "../repositories/notification.repository";
import NotificationService from "../services/notification.service";

export const _notificationContainer = new NotificationService(new NotificationRepository(new HttpClient()));
