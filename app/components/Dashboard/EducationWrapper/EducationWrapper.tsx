"use client";
import { useFetchData } from "@/app/hooks/useFetch";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteData, updateData } from "@/app/store/mainSlice";
import { AppDispatch } from "@/app/store/store";
import Pagination from "../Pagination/Pagination";
import { Form, FormBtn, FormControl, FormSwitch } from "../Form/Form";
import { MdDeleteOutline } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";

const EducationWrapper = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: education,
    isLoading,
    error,
  } = useFetchData(
    `education${
      searchParams.get("name") ? `?name=${searchParams.get("name")}` : ""
    }`
  );

  const handleDelete = (id: number) => {
    dispatch(deleteData({ apiEndpoint: "education", id }));
    toast.success("Education deleted successfully", {
      position: "top-right",
      duration: 2000,
    });
  };

  const handleSearch = (e: any) => {
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
  };
  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    active: boolean
  ) => {
    e.preventDefault();

    dispatch(
      updateData({
        apiEndpoint: "education",
        newData: { active },
        id: id,
      })
    );
    toast.success("Lead updated successfully", {
      position: "top-right",
      duration: 2000,
    });
  };
  if (error) {
    console.log(error);
  }

  return (
    <div className="data-table-container">
      <div className="flex justify-between items-stretch">
        <Form width="[300px]" onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleSearch}
          />
          <FormBtn text="Search" />
        </Form>
        <div className="flex">
          <Link
            href={"/dashboard/education/create"}
            className="form-button flex items-center text-white"
          >
            <IoAddSharp />
            <span>add</span>
          </Link>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Place</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6}>
                  <p className="text-center"> Loading...</p>
                </td>
              </tr>
            ) : education ? (
              education.map((education: Education) => (
                <tr key={education.id}>
                  <td>{education.id}</td>
                  <td>{education.name}</td>
                  <td>{education.place}</td>
                  <td>{education.date}</td>
                  <td>
                    <FormSwitch
                      onChange={(e) =>
                        handleUpdate(e, education.id, !education.active)
                      }
                      value={education.active}
                    />
                  </td>
                  <td>
                    <div className="flex justify-start items-center gap-2">
                      <button
                        onClick={() => handleDelete(education.id)}
                        className="action-btn"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <p className="text-center">No data found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default EducationWrapper;
