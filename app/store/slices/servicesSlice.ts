import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ServicesService from "@/app/services/api/services";
import {
  Service,
  ServiceFilter,
  AddServiceDataPayload,
  UpdateServiceDataPayload,
} from "@/app/types/store/services";

const initialState: DataState<Service, ServiceFilter> = {
  detail: null,
  data: null,
  isLoading: false,
  error: null,
  filter: {
    name: "",
  },
};

export const fetchServiceData = createAsyncThunk(
  "data/fetchServiceData",
  async (params: ServiceFilter, thunkAPI) => {
    try {
      const response = await ServicesService.getAllServices(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching data"
      );
    }
  }
);

export const fetchServiceDetail = createAsyncThunk(
  "data/fetchServiceDetail",
  async (id: string, thunkAPI) => {
    try {
      const response = await ServicesService.getServiceById(id);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching detailed data"
      );
    }
  }
);

export const addServiceData = createAsyncThunk(
  "data/addServiceData",
  async (newData: AddServiceDataPayload, thunkAPI) => {
    try {
      const response = await ServicesService.createService(newData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding data"
      );
    }
  }
);

export const updateServiceData = createAsyncThunk(
  "data/updateServiceData",
  async ({ params, id }: UpdateServiceDataPayload, thunkAPI) => {
    try {
      const response = await ServicesService.updateService(
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

export const deleteServiceData = createAsyncThunk(
  "data/deleteServiceData",
  async (id: number, thunkAPI) => {
    try {
      await ServicesService.deleteService(id.toString());
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting data"
      );
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setNameFilter(state, action: PayloadAction<string>) {
      state.filter.name = action.payload;
      console.log(state.filter.name);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchServiceData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchServiceData.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchServiceDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchServiceDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.detail = action.payload;
        }
      )
      .addCase(
        fetchServiceDetail.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(addServiceData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        addServiceData.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (state.data) {
            state.data.push(action.payload);
          }
        }
      )
      .addCase(addServiceData.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(updateServiceData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateServiceData.fulfilled,
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
        updateServiceData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(deleteServiceData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        deleteServiceData.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.data && state.data) {
            state.data = state.data.filter(
              (item: any) => item.id !== action.payload
            );
          }
        }
      )
      .addCase(
        deleteServiceData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      );
  },
});

export default servicesSlice.reducer;
export const { setNameFilter } = servicesSlice.actions;
