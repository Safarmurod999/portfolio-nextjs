import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { selectUser } from "@/app/store/selectors/user";
import {
  deleteUserData,
  fetchUserData,
  setUsernameFilter,
  updateUserData,
} from "@/app/store/slices/userSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState(searchParams.get("username") || "");

  const { data, isLoading, error, filter } = useSelector(selectUser);

  const handleDelete = (id: number) => {
    dispatch(deleteUserData(id)).then((res) => {
      if (res.type === "data/deleteUserData/fulfilled") {
        toast.success("User deleted successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/deleteUserData/rejected") {
        toast.error("Error deleting user", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(name, value);
      return newParams.toString();
    },
    [searchParams]
  );
  useEffect(() => {
    if (!username.trim()) {
      router.push(pathname);
    }
  }, [username, router, pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(pathname + "?" + createQueryString("username", username));
    }
    dispatch(setUsernameFilter(username));
  };

  const handleFilterReset = () => {
    setUsername("");
    router.push(pathname);
  };
  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    active: boolean
  ) => {
    e.preventDefault();
    dispatch(
      updateUserData({
        params: { active },
        id: +id,
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


  if (error) {
    console.log(error);
  }

  useEffect(() => {
    dispatch(fetchUserData(filter.username ? filter : {}));
  }, [dispatch, filter]);

  return {
    users: data,
    isLoading,
    handleDelete,
    handleSearch,
    username,
    handleSubmit,
    handleUpdate,
    handleFilterReset
  };
};

export default useConnect;
