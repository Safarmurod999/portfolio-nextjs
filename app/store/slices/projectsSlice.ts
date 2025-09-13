import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ProjectsService from "@/app/services/api/projects";
import {
  Projects,
  ProjectsFilter,
  AddProjectDataPayload,
  UpdateProjectDataPayload,
} from "@/app/types/store/projects";

const initialState: DataState<Projects, ProjectsFilter> = {
  detail: null,
  data: null,
  isLoading: false,
  error: null,
  filter: {
    title: "",
  },
};

export const fetchProjectData = createAsyncThunk(
  "data/fetchProjectData",
  async (params: ProjectsFilter, thunkAPI) => {
    try {
      const response = await ProjectsService.getAllProjects(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching data"
      );
    }
  }
);

export const fetchProjectDetail = createAsyncThunk(
  "data/fetchProjectDetail",
  async (id: string, thunkAPI) => {
    try {
      const response = await ProjectsService.getProjectById(id);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching detailed data"
      );
    }
  }
);

export const addProjectData = createAsyncThunk(
  "data/addProjectData",
  async (newData: AddProjectDataPayload, thunkAPI) => {
    try {
      const response = await ProjectsService.createProject(newData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding data"
      );
    }
  }
);

export const updateProjectData = createAsyncThunk(
  "data/updateProjectData",
  async ({ params, id }: UpdateProjectDataPayload, thunkAPI) => {
    try {
      const response = await ProjectsService.updateProject(
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

export const deleteProjectData = createAsyncThunk(
  "data/deleteProjectData",
  async (id: number, thunkAPI) => {
    try {
      await ProjectsService.deleteProject(id.toString());
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting data"
      );
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setTitleFilter(state, action: PayloadAction<string>) {
      state.filter.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProjectData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchProjectData.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchProjectDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProjectDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.detail = action.payload;
        }
      )
      .addCase(
        fetchProjectDetail.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(addProjectData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        addProjectData.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (state.data) {
            state.data.push(action.payload);
          }
        }
      )
      .addCase(addProjectData.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(updateProjectData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateProjectData.fulfilled,
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
        updateProjectData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(deleteProjectData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        deleteProjectData.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.data && state.data) {
            state.data = state.data.filter(
              (item: any) => item.id !== action.payload
            );
          }
        }
      )
      .addCase(
        deleteProjectData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      );
  },
});

export default projectsSlice.reducer;
export const { setTitleFilter } = projectsSlice.actions;
