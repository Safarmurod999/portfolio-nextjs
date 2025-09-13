import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import CategoriesService from "@/app/services/api/categories";
import {
  Category,
  CategoryFilter,
  AddCategoryDataPayload,
  UpdateCategoryDataPayload,
} from "@/app/types/store/categories";

const initialState: DataState<Category, CategoryFilter> = {
  detail: null,
  data: null,
  isLoading: false,
  error: null,
  filter: {
    name: "",
    active: undefined,
  },
};

export const fetchCategoryData = createAsyncThunk(
  "data/fetchCategoryData",
  async (params: CategoryFilter, thunkAPI) => {
    try {
      const response = await CategoriesService.getAllCategories(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching data"
      );
    }
  }
);

export const fetchCategoryDetail = createAsyncThunk(
  "data/fetchCategoryDetail",
  async (id: string, thunkAPI) => {
    try {
      const response = await CategoriesService.getCategoryById(id);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching detailed data"
      );
    }
  }
);

export const addCategoryData = createAsyncThunk(
  "data/addCategoryData",
  async (newData: AddCategoryDataPayload, thunkAPI) => {
    try {
      const response = await CategoriesService.createCategory(newData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding data"
      );
    }
  }
);

export const updateCategoryData = createAsyncThunk(
  "data/updateCategoryData",
  async ({ params, id }: UpdateCategoryDataPayload, thunkAPI) => {
    try {
      const response = await CategoriesService.updateCategory(
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

export const deleteCategoryData = createAsyncThunk(
  "data/deleteCategoryData",
  async (id: number, thunkAPI) => {
    try {
      await CategoriesService.deleteCategory(id.toString());
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting data"
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setNameFilter(state, action: PayloadAction<string>) {
      state.filter.name = action.payload;
      console.log(state.filter.name);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCategoryData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchCategoryData.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchCategoryDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCategoryDetail.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.detail = action.payload;
        }
      )
      .addCase(
        fetchCategoryDetail.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(addCategoryData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        addCategoryData.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (state.data) {
            state.data.push(action.payload);
          }
        }
      )
      .addCase(
        addCategoryData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(updateCategoryData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateCategoryData.fulfilled,
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
        updateCategoryData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      .addCase(deleteCategoryData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        deleteCategoryData.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.data && state.data) {
            state.data = state.data.filter(
              (item: any) => item.id !== action.payload
            );
          }
        }
      )
      .addCase(
        deleteCategoryData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      );
  },
});

export default categoriesSlice.reducer;
export const { setNameFilter } = categoriesSlice.actions;
