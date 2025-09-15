import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { selectTechnologies } from "@/app/store/selectors/technologies";
import {
  deleteTechnologyData,
  fetchTechnologyData,
  setNameFilter,
  updateTechnologyData,
} from "@/app/store/slices/technologiesSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");

  const { data, isLoading, error, filter } = useSelector(selectTechnologies);
  console.log(data);
   
  const handleDelete = (id: number) => {
    dispatch(deleteTechnologyData(id)).then((res) => {
      if (res.type === "data/deleteTechnologyData/fulfilled") {
        toast.success("Technology deleted successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/deleteTechnologyData/rejected") {
        toast.error("Error deleting technology", {
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
      updateTechnologyData({
        params: { active },
        id: +id,
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


  if (error) {
    console.log(error);
  }

  useEffect(() => {
    dispatch(fetchTechnologyData(filter.name ? filter : {}));
  }, [dispatch, filter]);

  return {
    technologies: data,
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
