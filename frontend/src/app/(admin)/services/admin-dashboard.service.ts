import HttpClient from "@/libs/interceptors";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBuilder, IService } from "@/libs/redux/types";

const initialState = {
   getDashboard: {
      isLoading: false,
      data: null,
   },
};

class AdminDashboardService implements IService {
   constructor(private http: HttpClient) {}

   getDashboard = {
      api: createAsyncThunk("!getDashboard", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.private.get("/admin/dashboard");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: IBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.getDashboard.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getDashboard.isLoading = false;
            state.getDashboard.data = action.payload;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getDashboard.isLoading = false;
            state.getDashboard.data = null;
         });
      },
   };

   private slice = createSlice({
      name: "AdminDashboardService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getDashboard.reducer(builder);
      },
   });

   reducer = this.slice.reducer;
   actions = this.slice.actions;
}

const object = new AdminDashboardService(new HttpClient());
export const adminDashboardReducer = object.reducer;
export const adminDashboardActions = object.actions;
export const adminDashboardService = object as Omit<typeof object, "reducer" | "actions">;
