import HttpClient from "@/libs/interceptors";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBuilder, IService } from "@/libs/redux/types";
import type { IUser } from "../types/admin.type";
import type { InviteUserDTO } from "../types/admin.dto";

const initialState = {
   getUsers: {
      isLoading: true,
      data: [] as IUser[],
   },
   inviteUser: {
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

   private slice = createSlice({
      name: "AdminUserService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getUsers.reducer(builder);
         this.inviteUser.reducer(builder);
      },
   });
   reducer = this.slice.reducer;
   actions = this.slice.actions;
}

const object = new AdminUserService(new HttpClient());
export const adminUserReducer = object.reducer;
export const adminUserActions = object.actions;
export const adminUserService = object as Omit<typeof object, "reducer" | "actions">;
