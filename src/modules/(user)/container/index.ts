import HttpClient from "@/libs/interceptors";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";

export const _userContainer = new UserService(new UserRepository(new HttpClient()));
