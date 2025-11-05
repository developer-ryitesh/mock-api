import HttpClient from "@/libs/interceptors";
import type { LoginPaylaod } from "../types/auth.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBuilder, IService } from "@/libs/redux/types";
import type { IUser } from "@/types/User.type";
import firebase from "@/libs/firebase/config";
import type { ForgotPasswordDTO, ResetPasswordDTO, UpdatePasswordDTO, UpdateProfileDTO } from "../types/auth.dto";

const initialState = {
   accessToken: localStorage.getItem("accessToken") || null,
   login: {
      isLoading: false,
   },
   session: {
      isLoading: true,
      data: null as null | IUser,
   },
   logout: {
      isLoading: false,
   },
   forgotPassword: {
      isLoading: false,
   },
   resetPassword: {
      isLoading: false,
   },
   updateProfile: {
      isLoading: false,
   },
   updatePassword: {
      isLoading: false,
   },
};

class AuthService implements IService {
   constructor(private http: HttpClient) {}
   login = {
      api: createAsyncThunk("login", async (credentials: LoginPaylaod, thunkAPI) => {
         try {
            const { data } = await this.http.public.post("/auth/login", credentials);
            localStorage.setItem("accessToken", data.data?.accessToken);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.login.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.login.isLoading = false;
            state.accessToken = action.payload?.data?.accessToken;
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

   session = {
      api: createAsyncThunk("!session", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.private.get("/user/session");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.session.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.session.isLoading = false;
            state.session.data = action.payload?.data?.user;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.session.isLoading = false;
         });
      },
   };

   logout = {
      api: createAsyncThunk("logout", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.private.get("/auth/logout");
            await firebase.swUnregister();
            localStorage.clear();
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.logout.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.logout.isLoading = false;
            state.accessToken = null;
            state.session.data = null;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.logout.isLoading = false;
         });
      },
   };

   updateProfile = {
      api: createAsyncThunk("updateProfile", async (body: UpdateProfileDTO, thunkAPI) => {
         try {
            const { data } = await this.http.private.put("/user/update-profile", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.updateProfile.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.updateProfile.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateProfile.isLoading = false;
         });
      },
   };

   updatePassword = {
      api: createAsyncThunk("updatePassword", async (body: UpdatePasswordDTO, thunkAPI) => {
         try {
            const { data } = await this.http.private.put("/user/update-password", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.updatePassword.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.updatePassword.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updatePassword.isLoading = false;
         });
      },
   };
   private slice = createSlice({
      name: "AuthService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.login.reducer(builder);
         this.session.reducer(builder);
         this.logout.reducer(builder);
         this.forgotPassword.reducer(builder);
         this.resetPassword.reducer(builder);
         this.updateProfile.reducer(builder);
         this.updatePassword.reducer(builder);
      },
   });
   reducer = this.slice.reducer;
   actions = this.slice.actions;
}

const object = new AuthService(new HttpClient());
export const authReducer = object.reducer;
export const authActions = object.actions;
export const authService = object as Omit<typeof object, "reducer" | "actions">;
