import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import EducationService from "@/app/services/api/education";
import {
  Education,
  EducationFilter,
  AddEducationDataPayload,
  UpdateEducationDataPayload,
} from "@/app/types/store/education";

const initialState: DataState<Education, EducationFilter> = {
  detail: null,
  data: null,
  isLoading: false,
  error: null,
  filter: {
    name: "",
  },
};

export const fetchEducationData = createAsyncThunk(
  "data/fetchEducationData",
  async (params: EducationFilter, thunkAPI) => {
    try {
      const response = await EducationService.getAllEducations(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching data"
      );
    }
  }
);

export const fetchEducationDetail = createAsyncThunk(
  "data/fetchEducationDetail",
  async (id: string, thunkAPI) => {
    try {
      const response = await EducationService.getEducationById(id);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching detailed data"
      );
    }
  }
);

export const addEducationData = createAsyncThunk(
  "data/addEducationData",
  async (newData: AddEducationDataPayload, thunkAPI) => {
    try {
      const response = await EducationService.createEducation(newData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding data"
      );
    }
  }
);

export const updateEducationData = createAsyncThunk(
  "data/updateEducationData",
  async ({ params, id }: UpdateEducationDataPayload, thunkAPI) => {
    try {
      const response = await EducationService.updateEducation(
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

export const deleteEducationData = createAsyncThunk(
  "data/deleteEducationData",
  async (id: number, thunkAPI) => {
    try {
      await EducationService.deleteEducation(id.toString());
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting data"
      );
    }
  }
);

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    setNameFilter(state, action: PayloadAction<string>) {
      state.filter.name = action.payload;
      console.log(state.filter.name);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducationData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEducationData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchEducationData.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchEducationDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEducationDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.detail = action.payload;
        }
      )
      .addCase(
        fetchEducationDetail.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(addEducationData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        addEducationData.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (state.data) {
            state.data.push(action.payload);
          }
        }
      )
      .addCase(
        addEducationData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(updateEducationData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateEducationData.fulfilled,
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
        updateEducationData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(deleteEducationData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        deleteEducationData.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.data && state.data) {
            state.data = state.data.filter(
              (item: any) => item.id !== action.payload
            );
          }
        }
      )
      .addCase(
        deleteEducationData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      );
  },
});

export default educationSlice.reducer;
export const { setNameFilter } = educationSlice.actions;
