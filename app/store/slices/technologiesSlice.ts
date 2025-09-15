import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import TechnologiesService from "@/app/services/api/technologies";
import {
  Technology,
  TechnologyFilter,
  AddTechnologyDataPayload,
  UpdateTechnologyDataPayload,
} from "@/app/types/store/technologies";

const initialState: DataState<Technology, TechnologyFilter> = {
  detail: null,
  data: null,
  isLoading: false,
  error: null,
  filter: {
    name: "",
  },
};

export const fetchTechnologyData = createAsyncThunk(
  "data/fetchTechnologyData",
  async (params: TechnologyFilter, thunkAPI) => {
    try {
      const response = await TechnologiesService.getAllTechnologies(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching data"
      );
    }
  }
);

export const fetchTechnologyDetail = createAsyncThunk(
  "data/fetchTechnologyDetail",
  async (id: string, thunkAPI) => {
    try {
      const response = await TechnologiesService.getTechnologyById(id);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching detailed data"
      );
    }
  }
);

export const addTechnologyData = createAsyncThunk(
  "data/addTechnologyData",
  async (newData: AddTechnologyDataPayload, thunkAPI) => {
    try {
      const response = await TechnologiesService.createTechnology(newData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding data"
      );
    }
  }
);

export const updateTechnologyData = createAsyncThunk(
  "data/updateTechnologyData",
  async ({ params, id }: UpdateTechnologyDataPayload, thunkAPI) => {
    try {
      const response = await TechnologiesService.updateTechnology(
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

export const deleteTechnologyData = createAsyncThunk(
  "data/deleteTechnologyData",
  async (id: number, thunkAPI) => {
    try {
      await TechnologiesService.deleteTechnology(id.toString());
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting data"
      );
    }
  }
);

const technologiesSlice = createSlice({
  name: "technologies",
  initialState,
  reducers: {
    setNameFilter(state, action: PayloadAction<string>) {
      state.filter.name = action.payload;
      console.log(state.filter.name);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechnologyData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTechnologyData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchTechnologyData.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchTechnologyDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTechnologyDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.detail = action.payload;
        }
      )
      .addCase(
        fetchTechnologyDetail.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(addTechnologyData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        addTechnologyData.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (state.data) {
            state.data.push(action.payload);
          }
        }
      )
      .addCase(
        addTechnologyData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(updateTechnologyData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateTechnologyData.fulfilled,
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
        updateTechnologyData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(deleteTechnologyData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        deleteTechnologyData.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.data && state.data) {
            state.data = state.data.filter(
              (item: any) => item.id !== action.payload
            );
          }
        }
      )
      .addCase(
        deleteTechnologyData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      );
  },
});

export default technologiesSlice.reducer;
export const { setNameFilter } = technologiesSlice.actions;
