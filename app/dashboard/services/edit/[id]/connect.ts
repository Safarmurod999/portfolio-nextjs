import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { selectServices } from "@/app/store/selectors/services";
import {
  fetchServiceDetail,
  updateServiceData,
} from "@/app/store/slices/servicesSlice";
import { toast } from "sonner";
import { fetchCategoryData } from "@/app/store/slices/categoriesSlice";
import { selectCategory } from "@/app/store/selectors/categories";

const useConnect = () => {
  let categoryList;
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { data: categories, isLoading: categoryLoading } =
    useSelector(selectCategory);

  if (!categoryLoading && categories) {
    categoryList = categories.map((cat) => ({
      label: cat.name,
      value: cat.id.toString(),
    }));
  }
  const { detail, isLoading, error } = useSelector(selectServices);

  const handleUpdate = (values: any) => {
    dispatch(
      updateServiceData({
        params: values,
        id: id as string | number,
      })
    ).then((res) => {
      if (res.type === "data/updateServiceData/fulfilled") {
        toast.success("Service updated successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/updateServiceData/rejected") {
        toast.error("Error updating service", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: detail?.name,
      category_id: detail?.category?.id,
    },
    onSubmit: handleUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    dispatch(fetchCategoryData({ name: "" }));
    dispatch(fetchServiceDetail(id as string));
  }, [dispatch]);

  return {
    handleSubmit,
    handleChange,
    values,
    isLoading,
    error,
    categoryList,
  };
};

export default useConnect;
