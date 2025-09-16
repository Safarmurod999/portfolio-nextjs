import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { selectServiceDetails } from "@/app/store/selectors/service-details";
import {
  fetchServiceDetailsDetail,
  updateServiceDetailsData,
} from "@/app/store/slices/serviceDetailsSlice";
import { toast } from "sonner";
import { fetchServiceData } from "@/app/store/slices/servicesSlice";
import { selectServices } from "@/app/store/selectors/services";

const useConnect = () => {
  let servicesList;
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { data: services, isLoading: servicesLoading } =
    useSelector(selectServices);

  if (!servicesLoading && services) {
    servicesList = services.map((cat) => ({
      label: cat.name,
      value: cat.id.toString(),
    }));
  }
  const { detail, isLoading, error } = useSelector(selectServiceDetails);

  const handleUpdate = (values: any) => {
    dispatch(
      updateServiceDetailsData({
        params: values,
        id: id as string | number,
      })
    ).then((res) => {
      if (res.type === "data/updateServiceDetailsData/fulfilled") {
        toast.success("Service updated successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/updateServiceDetailsData/rejected") {
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
      service_id: detail?.service?.id,
    },
    onSubmit: handleUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    dispatch(fetchServiceData({ name: "" }));
    dispatch(fetchServiceDetailsDetail(id as string));
  }, [dispatch]);

  return {
    handleSubmit,
    handleChange,
    values,
    isLoading,
    error,
    servicesList,
  };
};

export default useConnect;
