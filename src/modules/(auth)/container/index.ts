import HttpClient from "@/libs/interceptors";
import AuthRepository from "../repositories/auth.repository";
import AuthService from "../services/auth.service";

export const _authContainer = new AuthService(new AuthRepository(new HttpClient()));
