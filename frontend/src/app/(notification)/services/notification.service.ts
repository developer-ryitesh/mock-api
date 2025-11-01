import HttpClient from "@/libs/interceptors";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBuilder, IService } from "@/libs/redux/types";
import type { INotification } from "../types/notification.type";

const initialState = {
   subscribe: {
      isLoading: false,
   },
   notifications: {
      isLoading: true,
      data: [] as INotification[],
   },
   markAsRead: {
      isLoading: true,
   },
};

class NotificationService implements IService {
   constructor(private http: HttpClient) {}
   subscribe = {
      api: createAsyncThunk("subscribe", async (deviceToken: string, thunkAPI) => {
         try {
            const { data } = await this.http.private.post("/notification/subscribe", {
               deviceToken,
            });
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.subscribe.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.subscribe.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.subscribe.isLoading = false;
         });
      },
   };

   getAllNotifications = {
      api: createAsyncThunk("!getAllNotifications", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.private.get("/notification/all");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.notifications.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            const notifications = action.payload?.data?.notifications || [];
            state.notifications.isLoading = false;
            state.notifications.data = notifications;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.notifications.isLoading = false;
            state.notifications.data = [];
         });
      },
   };

   markAsRead = {
      api: createAsyncThunk("markAsRead", async (ids: string[], thunkAPI) => {
         try {
            const { data } = await this.http.private.patch("/notification/read", { ids });
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.markAsRead.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.markAsRead.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.markAsRead.isLoading = false;
         });
      },
   };
   private slice = createSlice({
      name: "AuthService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.subscribe.reducer(builder);
         this.getAllNotifications.reducer(builder);
         this.markAsRead.reducer(builder);
      },
   });
   reducer = this.slice.reducer;
   actions = this.slice.actions;
}

const object = new NotificationService(new HttpClient());
export const notificationReducer = object.reducer;
export const notificationActions = object.actions;
export const notificationService = object as Omit<typeof object, "reducer" | "actions">;
