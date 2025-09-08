import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { AppDispatch } from "@/app/store/store";
import { selectUser } from "@/app/store/selectors/user";
import { fetchUserDetail, updateUserData } from "@/app/store/slices/userSlice";
import { User } from "@/app/types/store/users";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { userData, isLoading, error } = useSelector(selectUser);

  const handleUpdate = (values: Omit<User, "id">) => {
    dispatch(
      updateUserData({
        params: values,
        id: id as string | number,
      })
    ).then((res) => {
      if (res.type === "data/updateUserData/fulfilled") {
        toast.success("User updated successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/updateUserData/rejected") {
        toast.error("Error updating user", {
          position: "bottom-right",
          duration: 2000,
        });
      }
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
