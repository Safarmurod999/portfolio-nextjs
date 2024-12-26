import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASIC_URL } from "../const/data";

const initialState: DataState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ apiEndpoint }: FetchDataPayload, thunkAPI) => {
    try {
      const response = await axios.get(`${BASIC_URL}/${apiEndpoint}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching data"
      );
    }
  }
);

export const addData = createAsyncThunk(
  "data/addData",
  async ({ apiEndpoint, newData }: AddDataPayload, thunkAPI) => {
    try {
      const response = await axios.post(`${BASIC_URL}/${apiEndpoint}`, newData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding data"
      );
    }
  }
);

export const updateData = createAsyncThunk(
  "data/updateData",
  async ({ apiEndpoint, id, newData }: UpdateDataPayload, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASIC_URL}/${apiEndpoint}/${id}`,
        newData
        // {
        //   headers: { Authorization: `Bearer ${accessToken}` },
        // }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error updating data"
      );
    }
  }
);

export const deleteData = createAsyncThunk(
  "data/deleteData",
  async ({ apiEndpoint, id }: DeleteDataPayload, thunkAPI) => {
    try {
      await axios.delete(`${BASIC_URL}/${apiEndpoint}/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting data"
      );
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addData.pending, (state) => {
        state.error = null;
      })
      .addCase(addData.fulfilled, (state, action: PayloadAction<any>) => {
        if (state.data && state.data.data) {
          state.data.data.push(action.payload.data[0]);
        }
      })
      .addCase(addData.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(updateData.pending, (state) => {
        state.error = null;
      })
      .addCase(updateData.fulfilled, (state, action: PayloadAction<any>) => {
        if (state.data && state.data.data) {
          const index = state.data.data.findIndex(
            (item: any) => item.id === action.payload.data[0].id
          );
          if (index !== -1) {
            state.data.data[index] = action.payload.data[0];
          }
        }
      })
      .addCase(updateData.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(deleteData.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteData.fulfilled, (state, action: PayloadAction<number>) => {        
        if (state.data && state.data) {
          state.data = state.data.filter(
            (item: any) => item.id !== action.payload
          );
        }
      })
      .addCase(deleteData.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
export const {} = dataSlice.actions;
