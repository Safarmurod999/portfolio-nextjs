import { selectUser } from "@/app/store/selectors/user";
import {
  deleteUserData,
  fetchUserData,
  setUsernameFilter,
  updateUserData,
} from "@/app/store/slices/userSlice";
import { AppDispatch } from "@/app/store/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState(searchParams.get("username") || "");

  const { data, isLoading, error, filter } = useSelector(selectUser);

  const handleDelete = (id: number) => {
    dispatch(deleteUserData(id));
    toast.success("User deleted successfully", {
      position: "top-right",
      duration: 2000,
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
  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    active: boolean
  ) => {
    e.preventDefault();
    dispatch(
      updateUserData({
        newData: { active },
        id: id,
      })
    );
    toast.success("User updated successfully", {
      position: "top-right",
      duration: 2000,
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
  };
};

export default useConnect;
