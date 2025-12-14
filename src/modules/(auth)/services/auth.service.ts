import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBuilder, IService } from "@/libs/redux/types";
import type { ForgotPasswordDTO, LoginDTO, ResetPasswordDTO } from "../dtos/auth.dto";
import AuthRepository from "../repositories/auth.repository";

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

export default class AuthService implements IService {
   constructor(private _repo: AuthRepository) {}

   login = {
      api: createAsyncThunk("login", async (credentials: LoginDTO, thunkAPI) => {
         try {
            const { data } = await this._repo.login(credentials);
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
            const { data } = await this._repo.forgotPassword(body);
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
            const { data } = await this._repo.resetPassword(body);
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
