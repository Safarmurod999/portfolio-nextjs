import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { selectUser } from "@/app/store/selectors/user";
import {
  fetchUserDetail,
  updateUserData,
} from "@/app/store/slices/userSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const {userData, isLoading, error} = useSelector(selectUser);
  
  const handleUpdate = (values) => {
    dispatch(
      updateUserData({
        newData: values,
        id: +id,
      })
    );
    toast.success("User updated successfully", {
      position: "top-right",
      duration: 2000,
    });
  };
  
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: userData?.username,
      password: userData?.password,
    },
    onSubmit: handleUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    dispatch(fetchUserDetail(id as string));
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
