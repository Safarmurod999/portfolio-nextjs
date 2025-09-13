import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { selectCategory } from "@/app/store/selectors/categories";
import { fetchCategoryDetail, updateCategoryData } from "@/app/store/slices/categoriesSlice";
import { Category } from "@/app/types/store/categories";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { detail, isLoading, error } = useSelector(selectCategory);

  const handleUpdate = (values: Omit<Category, "id">) => {
    dispatch(
      updateCategoryData({
        params: values,
        id: id as string | number,
      })
    ).then((res) => {
      if (res.type === "data/updateCategoryData/fulfilled") {
        toast.success("Category updated successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/updateCategoryData/rejected") {
        toast.error("Error updating category", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: detail?.name,
    },
    onSubmit: handleUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    dispatch(fetchCategoryDetail(id as string));
  }, [dispatch]);

  return {
    handleSubmit,
    handleChange,
    values,
    isLoading,
    error,
  };
};

export default useConnect;
