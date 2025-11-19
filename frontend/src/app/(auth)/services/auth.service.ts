import HttpClient from "@/libs/interceptors";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBuilder, IService } from "@/libs/redux/types";
import type { ForgotPasswordDTO, LoginDTO, ResetPasswordDTO } from "../types/auth.dto";

const initialState = {
   login: {
      isLoading: false,
   },
   forgotPassword: {
      isLoading: false,
   },
   resetPassword: {
      isLoading: false,
   },
};

class AuthService implements IService {
   constructor(private http: HttpClient) {}
   login = {
      api: createAsyncThunk("login", async (credentials: LoginDTO, thunkAPI) => {
         try {
            const { data } = await this.http.public.post("/auth/login", credentials);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.login.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.login.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.login.isLoading = false;
         });
      },
   };

   forgotPassword = {
      api: createAsyncThunk("forgotPassword", async (body: ForgotPasswordDTO, thunkAPI) => {
         try {
            const { data } = await this.http.public.post("/auth/forgot-password", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.forgotPassword.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.forgotPassword.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.forgotPassword.isLoading = false;
         });
      },
   };

   resetPassword = {
      api: createAsyncThunk("resetPassword", async (body: ResetPasswordDTO, thunkAPI) => {
         try {
            const { data } = await this.http.public.post("/auth/reset-password", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.resetPassword.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.resetPassword.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.resetPassword.isLoading = false;
         });
      },
   };

   private slice = createSlice({
      name: "AuthService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.login.reducer(builder);
         this.forgotPassword.reducer(builder);
         this.resetPassword.reducer(builder);
      },
   });
   reducer = this.slice.reducer;
   actions = this.slice.actions;
}

const object = new AuthService(new HttpClient());
export const authReducer = object.reducer;
export const authActions = object.actions;
export const authService = object as Omit<typeof object, "reducer" | "actions">;
