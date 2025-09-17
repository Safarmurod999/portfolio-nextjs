import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { selectServiceDetails } from "@/app/store/selectors/service-details";
import {
  deleteServiceDetailsData,
  fetchServiceDetailsData,
  setNameFilter,
  updateServiceDetailsData,
} from "@/app/store/slices/serviceDetailsSlice";
import { toast } from "sonner";

const useConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");

  const { data, isLoading, error, filter } = useSelector(selectServiceDetails);

  const handleDelete = (id: number) => {
    dispatch(deleteServiceDetailsData(id)).then((res) => {
      if (res.type === "data/deleteServiceDetailsData/fulfilled") {
        toast.success("Service deleted successfully", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (res.type === "data/deleteServiceDetailsData/rejected") {
        toast.error("Error deleting service", {
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
    (name : string, value: string) => {
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
      router.push(pathname + "?" + createQueryString("name", name.trim()));
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
      updateServiceDetailsData({
        params: { active },
        id: +id,
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

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    dispatch(fetchServiceDetailsData(filter.name ? filter : {}));
  }, [dispatch, filter]);

  return {
    serviceDetails: data,
    isLoading,
    handleDelete,
    handleSearch,
    name,
    handleSubmit,
    handleUpdate,
    handleFilterReset,
  };
};

export default useConnect;
