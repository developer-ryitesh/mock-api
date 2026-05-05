import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBuilder, IService } from "@/libs/redux/types";
import UserRepository from "../repositories/user.repository";
import type { InviteUserDTO, UpdatePasswordDTO, UpdateProfileDTO, UserStatusDTO } from "../dtos/user.dto";
import type { ISessionModel } from "../models/session.model";
import HttpClient from "@/libs/interceptors";

const initialState = {
   accessToken: localStorage.getItem("accessToken") || null,
   getSession: {
      isLoading: true,
      data: null as ISessionModel | null,
   },
   getUsers: {
      isLoading: true,
      data: [] as ISessionModel[],
   },
   updateProfile: {
      isLoading: false,
   },
   inviteUser: {
      isLoading: false,
   },
   getSingleUser: {
      isLoading: true,
      data: null as ISessionModel | null,
   },
   userStatus: {
      isLoading: false,
   },
   deleteUser: {
      isLoading: false,
   },
   updatePassword: {
      isLoading: false,
   },
   logout: {
      isLoading: false,
   },
   dashboard: {
      isLoading: true,
      data: null as null | {
         users: {
            total: number;
            active: number;
            inactive: number;
         };
      },
   },
};

class UserService implements IService {
   constructor(private _repo: UserRepository) {}

   getSession = {
      api: createAsyncThunk("!getSession", async (_, thunkAPI) => {
         try {
            const { data } = await this._repo.getSession();
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.getSession.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getSession.isLoading = false;
            state.getSession.data = action.payload?.data;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getSession.isLoading = false;
         });
      },
   };

   updateProfile = {
      api: createAsyncThunk("updateProfile", async (body: UpdateProfileDTO, thunkAPI) => {
         try {
            const { data } = await this._repo.updateProfile(body);
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
            const { data } = await this._repo.updatePassword(body);
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

   inviteUser = {
      api: createAsyncThunk("inviteUser", async (body: InviteUserDTO, thunkAPI) => {
         try {
            const { data } = await this._repo.inviteUser(body);
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
            const { data } = await this._repo.getUsers();
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
            const { data } = await this._repo.getUserById(id);
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
            state.getSingleUser.data = action.payload.data || null;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getSingleUser.isLoading = false;
            state.getSingleUser.data = null;
         });
      },
   };

   userStatus = {
      api: createAsyncThunk("userActivation", async (body: UserStatusDTO, thunkAPI) => {
         try {
            const { data } = await this._repo.changeUserStatus(body);
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
            const isActive = action.payload?.data?.isActive;
            state.userStatus.isLoading = false;
            if (state.getSingleUser.data) state.getSingleUser.data.isActive = isActive;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.userStatus.isLoading = false;
         });
      },
   };

   deleteUser = {
      api: createAsyncThunk("deleteUser", async (id: string, thunkAPI) => {
         try {
            const { data } = await this._repo.deleteUserById(id);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.deleteUser.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.deleteUser.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.deleteUser.isLoading = false;
         });
      },
   };

   dashboard = {
      api: createAsyncThunk("!dashboard", async (_, thunkAPI) => {
         try {
            const { data } = await this._repo.dashboard();
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.dashboard.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.dashboard.isLoading = false;
            state.dashboard.data = action.payload.data;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.dashboard.isLoading = false;
         });
      },
   };

   logout = {
      api: createAsyncThunk("logout", async (_, thunkAPI) => {
         try {
            const { data } = await this._repo.userLogout();
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
            state.getSession.data = null;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.logout.isLoading = false;
         });
      },
   };

   private slice = createSlice({
      name: "UserService",
      initialState,
      reducers: {
         updateToken(state, action) {
            state.accessToken = action.payload;
         },
      },
      extraReducers: (builder) => {
         this.getSession.reducer(builder);
         this.logout.reducer(builder);
         this.updateProfile.reducer(builder);
         this.updatePassword.reducer(builder);
         this.getUsers.reducer(builder);
         this.getSingleUser.reducer(builder);
         this.inviteUser.reducer(builder);
         this.userStatus.reducer(builder);
         this.deleteUser.reducer(builder);
         this.dashboard.reducer(builder);
      },
   });
   reducer = this.slice.reducer;
   actions = this.slice.actions;
}

/*---------[ di container ]--------*/
const container = new UserService(new UserRepository(new HttpClient()));
export const userActions = container.actions;
export const userReducer = container.reducer;
export const userService = container as Omit<typeof container, "reducer" | "actions">;
