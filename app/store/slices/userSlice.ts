import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import UserService from "@/app/services/api/users";
import { User, UserFilter, AddUserDataPayload, UpdateUserDataPayload } from "@/app/types/store/users";

const initialState: DataState<User, UserFilter> = {
  userData: null,
  data: null,
  isLoading: false,
  error: null,
  filter: {
    username: "",
    active: undefined,
  },
};

export const fetchUserData = createAsyncThunk(
  "data/fetchUserData",
  async (params: UserFilter, thunkAPI) => {
    try {
      const response = await UserService.getAllUsers(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching data"
      );
    }
  }
);

export const fetchUserDetail = createAsyncThunk(
  "data/fetchUserDetail",
  async (id: string, thunkAPI) => {
    try {
      const response = await UserService.getUserById(id);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching detailed data"
      );
    }
  }
);

export const addUserData = createAsyncThunk(
  "data/addUserData",
  async (newData: AddUserDataPayload, thunkAPI) => {
    try {
      const response = await UserService.createUser(newData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding data"
      );
    }
  }
);

export const updateUserData = createAsyncThunk(
  "data/updateUserData",
  async ({ params, id }: UpdateUserDataPayload, thunkAPI) => {
    try {
      const response = await UserService.updateUser(id.toString(), params);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error updating data"
      );
    }
  }
);

export const deleteUserData = createAsyncThunk(
  "data/deleteUserData",
  async (id: number, thunkAPI) => {
    try {
      await UserService.deleteUser(id.toString());
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting data"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsernameFilter(state, action: PayloadAction<string>) {
      state.filter.username = action.payload;
      console.log(state.filter.username);
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUserDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.userData = action.payload;
        }
      )
      .addCase(
        fetchUserDetail.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(addUserData.pending, (state) => {
        state.error = null;
      })
      .addCase(addUserData.fulfilled, (state, action: PayloadAction<any>) => {
        if (state.data) {          
          state.data.push(action.payload);
        }
      })
      .addCase(addUserData.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(updateUserData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (state.data) {
            const index = state.data.findIndex(
              (item: any) => item.id === action.payload.id
            );
            if (index !== -1) {
              state.data[index] = action.payload;
            }
          }
        }
      )
      .addCase(updateUserData.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(deleteUserData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        deleteUserData.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.data && state.data) {
            state.data = state.data.filter(
              (item: any) => item.id !== action.payload
            );
          }
        }
      )
      .addCase(deleteUserData.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { setUsernameFilter } = userSlice.actions;
