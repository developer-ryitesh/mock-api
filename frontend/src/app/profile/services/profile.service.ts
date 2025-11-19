import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ISession } from "../types/profile.type";
import HttpClient from "@/libs/interceptors";
import type { IBuilder } from "@/libs/redux/types";
import firebase from "@/libs/firebase/config";
import type { UpdatePasswordDTO, UpdateProfileDTO } from "../types/profile.dto";

const initialState = {
   accessToken: localStorage.getItem("accessToken") || null,
   updateProfile: {
      isLoading: false,
   },
   updatePassword: {
      isLoading: false,
   },
   session: {
      isLoading: true,
      data: null as null | ISession,
   },
   logout: {
      isLoading: false,
   },
};

class ProfileService {
   constructor(private http: HttpClient) {}

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

   private slice = createSlice({
      name: "ProfileService",
      initialState,
      reducers: {
         updateToken(state, action) {
            state.accessToken = action.payload;
         },
      },
      extraReducers: (builder) => {
         this.session.reducer(builder);
         this.updateProfile.reducer(builder);
         this.updatePassword.reducer(builder);
         this.logout.reducer(builder);
      },
   });
   reducer = this.slice.reducer;
   actions = this.slice.actions;
}

const object = new ProfileService(new HttpClient());
export const profileReducer = object.reducer;
export const profileActions = object.actions;
export const profileService = object as Omit<typeof object, "reducer" | "actions">;
