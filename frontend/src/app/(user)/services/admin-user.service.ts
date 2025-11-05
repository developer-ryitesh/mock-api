import HttpClient from "@/libs/interceptors";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBuilder, IService } from "@/libs/redux/types";
import type { IUser } from "../types/admin.type";
import type { InviteUserDTO, UserStatusDTO } from "../types/admin.dto";

const initialState = {
   getUsers: {
      isLoading: true,
      data: [] as IUser[],
   },
   inviteUser: {
      isLoading: false,
   },
   getSingleUser: {
      isLoading: true,
      data: null as IUser | null,
   },
   userStatus: {
      isLoading: false,
   },
};

class AdminUserService implements IService {
   constructor(private http: HttpClient) {}

   inviteUser = {
      api: createAsyncThunk("inviteUser", async (body: InviteUserDTO, thunkAPI) => {
         try {
            const { data } = await this.http.private.post("/admin/invite-user", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.inviteUser.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.inviteUser.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.inviteUser.isLoading = false;
         });
      },
   };

   getUsers = {
      api: createAsyncThunk("!getUsers", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.private.get("/admin/users");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.getUsers.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getUsers.isLoading = false;
            state.getUsers.data = action.payload.data?.users || [];
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getUsers.isLoading = false;
            state.getUsers.data = [];
         });
      },
   };

   getSingleUser = {
      api: createAsyncThunk("!getSingleUser", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.http.private.get("/admin/users/" + id);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.getSingleUser.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getSingleUser.isLoading = false;
            state.getSingleUser.data = action.payload.data?.user || null;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getSingleUser.isLoading = false;
            state.getSingleUser.data = null;
         });
      },
   };

   userStatus = {
      api: createAsyncThunk("userStatus", async (body: UserStatusDTO, thunkAPI) => {
         try {
            const { data } = await this.http.private.post("/admin/user-status", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.userStatus.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            const status = action.payload?.data?.status;
            state.userStatus.isLoading = false;
            if (state.getSingleUser.data) state.getSingleUser.data.isActive = status;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.userStatus.isLoading = false;
         });
      },
   };
   private slice = createSlice({
      name: "AdminUserService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getUsers.reducer(builder);
         this.getSingleUser.reducer(builder);
         this.inviteUser.reducer(builder);
         this.userStatus.reducer(builder);
      },
   });
   reducer = this.slice.reducer;
   actions = this.slice.actions;
}

const object = new AdminUserService(new HttpClient());
export const adminUserReducer = object.reducer;
export const adminUserActions = object.actions;
export const adminUserService = object as Omit<typeof object, "reducer" | "actions">;
