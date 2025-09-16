import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ServiceDetailsService from "@/app/services/api/service-details";
import {
  ServiceDetails,
  ServiceDetailsFilter,
  AddServiceDetailsDataPayload,
  UpdateServiceDetailsDataPayload,
} from "@/app/types/store/service-details";

const initialState: DataState<ServiceDetails, ServiceDetailsFilter> = {
  detail: null,
  data: null,
  isLoading: false,
  error: null,
  filter: {
    name: "",
  },
};

export const fetchServiceDetailsData = createAsyncThunk(
  "data/fetchServiceDetailsData",
  async (params: ServiceDetailsFilter, thunkAPI) => {
    try {
      const response = await ServiceDetailsService.getAllServiceDetails(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching data"
      );
    }
  }
);

export const fetchServiceDetailsDetail = createAsyncThunk(
  "data/fetchServiceDetailsDetail",
  async (id: string, thunkAPI) => {
    try {
      const response = await ServiceDetailsService.getServiceDetailById(id);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching detailed data"
      );
    }
  }
);

export const addServiceDetailsData = createAsyncThunk(
  "data/addServiceDetailsData",
  async (newData: AddServiceDetailsDataPayload, thunkAPI) => {
    try {
      const response = await ServiceDetailsService.createServiceDetail(newData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding data"
      );
    }
  }
);

export const updateServiceDetailsData = createAsyncThunk(
  "data/updateServiceDetailsData",
  async ({ params, id }: UpdateServiceDetailsDataPayload, thunkAPI) => {
    try {
      const response = await ServiceDetailsService.updateServiceDetail(
        id.toString(),
        params
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error updating data"
      );
    }
  }
);

export const deleteServiceDetailsData = createAsyncThunk(
  "data/deleteServiceDetailsData",
  async (id: number, thunkAPI) => {
    try {
      await ServiceDetailsService.deleteServiceDetail(id.toString());
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting data"
      );
    }
  }
);

const serviceDetailsSlice = createSlice({
  name: "servicedetails",
  initialState,
  reducers: {
    setNameFilter(state, action: PayloadAction<string>) {
      state.filter.name = action.payload;
      console.log(state.filter.name);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceDetailsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchServiceDetailsData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchServiceDetailsData.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchServiceDetailsDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchServiceDetailsDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.detail = action.payload;
        }
      )
      .addCase(
        fetchServiceDetailsDetail.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(addServiceDetailsData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        addServiceDetailsData.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (state.data) {
            state.data.push(action.payload);
          }
        }
      )
      .addCase(
        addServiceDetailsData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(updateServiceDetailsData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateServiceDetailsData.fulfilled,
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
      .addCase(
        updateServiceDetailsData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(deleteServiceDetailsData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        deleteServiceDetailsData.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.data && state.data) {
            state.data = state.data.filter(
              (item: any) => item.id !== action.payload
            );
          }
        }
      )
      .addCase(
        deleteServiceDetailsData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      );
  },
});

export default serviceDetailsSlice.reducer;
export const { setNameFilter } = serviceDetailsSlice.actions;
