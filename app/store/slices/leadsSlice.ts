import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import LeadsService from "@/app/services/api/leads";
import {
  Leads,
  LeadsFilter,
  AddLeadsDataPayload,
  UpdateLeadsDataPayload,
} from "@/app/types/store/leads";

const initialState: DataState<Leads, LeadsFilter> = {
  detail: null,
  data: null,
  isLoading: false,
  error: null,
  filter: {
    fullname: "",
  },
};

export const fetchLeadData = createAsyncThunk(
  "data/fetchLeadData",
  async (params: LeadsFilter, thunkAPI) => {
    try {
      const response = await LeadsService.getAllLeads(params);
      
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching data"
      );
    }
  }
);

export const fetchLeadDetail = createAsyncThunk(
  "data/fetchLeadDetail",
  async (id: string, thunkAPI) => {
    try {
      const response = await LeadsService.getLeadById(id);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching detailed data"
      );
    }
  }
);

export const addLeadData = createAsyncThunk(
  "data/addLeadData",
  async (newData: AddLeadsDataPayload, thunkAPI) => {
    try {
      const response = await LeadsService.createLead(newData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding data"
      );
    }
  }
);

export const updateLeadData = createAsyncThunk(
  "data/updateLeadData",
  async ({ params, id }: UpdateLeadsDataPayload, thunkAPI) => {
    try {
      const response = await LeadsService.updateLead(
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

export const deleteLeadData = createAsyncThunk(
  "data/deleteLeadData",
  async (id: number, thunkAPI) => {
    try {
      await LeadsService.deleteLead(id.toString());
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting data"
      );
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setNameFilter(state, action: PayloadAction<string>) {
      state.filter.fullname = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchLeadData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchLeadData.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchLeadDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchLeadDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.detail = action.payload;
        }
      )
      .addCase(
        fetchLeadDetail.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(addLeadData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        addLeadData.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (state.data) {
            state.data.push(action.payload);
          }
        }
      )
      .addCase(
        addLeadData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(updateLeadData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateLeadData.fulfilled,
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
        updateLeadData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(deleteLeadData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        deleteLeadData.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.data && state.data) {
            state.data = state.data.filter(
              (item: any) => item.id !== action.payload
            );
          }
        }
      )
      .addCase(
        deleteLeadData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      );
  },
});

export default leadsSlice.reducer;
export const { setNameFilter } = leadsSlice.actions;
