import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { selectEducation } from "@/app/store/selectors/education";
import {
  deleteEducationData,
  fetchEducationData,
  setNameFilter,
  updateEducationData,
} from "@/app/store/slices/educationSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");

  const { data, isLoading, error, filter } = useSelector(selectEducation);
  console.log(data);
   
  const handleDelete = (id: number) => {
    dispatch(deleteEducationData(id)).then((res) => {
      if (res.type === "data/deleteEducationData/fulfilled") {
        toast.success("Education deleted successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/deleteEducationData/rejected") {
        toast.error("Error deleting education", {
          position: "bottom-right",
          duration: 2000,
        });
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
    if (!name.trim()) {
      router.push(pathname);
    }
  }, [name, router, pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      router.push(pathname + "?" + createQueryString("name", name));
    }
    dispatch(setNameFilter(name));
  };

  const handleFilterReset = () => {
    setName("");
    router.push(pathname);
  };
  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    active: boolean
  ) => {
    e.preventDefault();
    dispatch(
      updateEducationData({
        params: { active },
        id: +id,
      })
    ).then((res) => {
      if (res.type === "data/updateEducationData/fulfilled") {
        toast.success("Education updated successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/updateEducationData/rejected") {
        toast.error("Error updating education", {
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
    dispatch(fetchEducationData(filter.name ? filter : {}));
  }, [dispatch, filter]);

  return {
    education: data,
    isLoading,
    handleDelete,
    handleSearch,
    name,
    handleSubmit,
    handleUpdate,
    handleFilterReset
  };
};

export default useConnect;
