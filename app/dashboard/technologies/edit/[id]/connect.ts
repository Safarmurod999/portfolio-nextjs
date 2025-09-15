import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { selectTechnologies } from "@/app/store/selectors/technologies";
import {
  fetchTechnologyDetail,
  updateTechnologyData,
} from "@/app/store/slices/technologiesSlice";
import { Technology } from "@/app/types/store/technologies";
import { toast } from "sonner";
import { selectCategory } from "@/app/store/selectors/categories";
import { fetchCategoryData } from "@/app/store/slices/categoriesSlice";

const useConnect = () => {
  let categoriesList;
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { detail, isLoading, error } = useSelector(selectTechnologies);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
    filter,
  } = useSelector(selectCategory) as {
    data: any[];
    isLoading: boolean;
    error: any;
    filter: any;
  };

  if (!isLoading && categories) {
    categoriesList = categories.map((el) => ({ value: el.id, label: el.name }));
  }

  const handleUpdate = (values: Omit<Technology, "id" | "active">) => {
    dispatch(
      updateTechnologyData({
        params: values,
        id: id as string | number,
      })
    ).then((res) => {
      if (res.type === "data/updateTechnologyData/fulfilled") {
        toast.success("Technology updated successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/updateTechnologyData/rejected") {
        toast.error("Error updating technology", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: detail?.name,
      icon: detail?.icon,
      category_id: detail?.category_id,
    },
    onSubmit: handleUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    dispatch(fetchTechnologyDetail(id as string));
    dispatch(fetchCategoryData(filter.name || ""));
  }, [dispatch]);

  return {
    handleSubmit,
    handleChange,
    values,
    isLoading,
    error,
    categories: categoriesList,
    isLoadingCategories,
    errorCategories,
  };
};

export default useConnect;
