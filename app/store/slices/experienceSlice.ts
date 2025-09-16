import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ExperienceService from "@/app/services/api/experince";
import {
  Experience,
  ExperienceFilter,
  AddExperienceDataPayload,
  UpdateExperienceDataPayload,
} from "@/app/types/store/experience";

const initialState: DataState<Experience, ExperienceFilter> = {
  detail: null,
  data: null,
  isLoading: false,
  error: null,
  filter: {
    company: "",
  },
};

export const fetchExperienceData = createAsyncThunk(
  "data/fetchExperienceData",
  async (params: ExperienceFilter, thunkAPI) => {
    try {
      const response = await ExperienceService.getAllExperiences(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching data"
      );
    }
  }
);

export const fetchExperienceDetail = createAsyncThunk(
  "data/fetchExperienceDetail",
  async (id: string, thunkAPI) => {
    try {
      const response = await ExperienceService.getExperienceById(id);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching detailed data"
      );
    }
  }
);

export const addExperienceData = createAsyncThunk(
  "data/addExperienceData",
  async (newData: AddExperienceDataPayload, thunkAPI) => {
    try {
      const response = await ExperienceService.createExperience(newData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding data"
      );
    }
  }
);

export const updateExperienceData = createAsyncThunk(
  "data/updateExperienceData",
  async ({ params, id }: UpdateExperienceDataPayload, thunkAPI) => {
    try {
      const response = await ExperienceService.updateExperience(
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

export const deleteExperienceData = createAsyncThunk(
  "data/deleteExperienceData",
  async (id: number, thunkAPI) => {
    try {
      await ExperienceService.deleteExperience(id.toString());
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting data"
      );
    }
  }
);

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    setCompanyFilter(state, action: PayloadAction<string>) {
      state.filter.company = action.payload;
      console.log(state.filter.company);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperienceData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchExperienceData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchExperienceData.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchExperienceDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchExperienceDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.detail = action.payload;
        }
      )
      .addCase(
        fetchExperienceDetail.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(addExperienceData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        addExperienceData.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (state.data) {
            state.data.push(action.payload);
          }
        }
      )
      .addCase(
        addExperienceData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(updateExperienceData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateExperienceData.fulfilled,
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
        updateExperienceData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(deleteExperienceData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        deleteExperienceData.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.data && state.data) {
            state.data = state.data.filter(
              (item: any) => item.id !== action.payload
            );
          }
        }
      )
      .addCase(
        deleteExperienceData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      );
  },
});

export default experienceSlice.reducer;
export const { setCompanyFilter } = experienceSlice.actions;
