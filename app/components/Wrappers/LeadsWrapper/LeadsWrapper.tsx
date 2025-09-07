"use client";
import { useFetchData } from "@/app/hooks/useFetch";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteData, updateData } from "@/app/store/slices/userSlice";
import { AppDispatch } from "@/app/store/store";
import Pagination from "../../Dashboard/Pagination/Pagination";
import { Form, FormBtn, FormControl, FormSwitch } from "../../Dashboard/Form/Form";
import { MdDeleteOutline } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LeadsWrapper = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [fullname, setFullname] = useState(searchParams.get("fullname") || "");
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: leads,
    isLoading,
    error,
  } = useFetchData(
    `leads${
      searchParams.get("fullname")
        ? `?fullname=${searchParams.get("fullname")}`
        : ""
    }`
  );

  const handleDelete = (id: number) => {
    dispatch(deleteData({ apiEndpoint: "leads", id }));
    toast.success("Lead deleted successfully", {
      position: "top-right",
      duration: 2000,
    });
  };

  const handleSearch = (e: any) => {
    setFullname(e.target.value);
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
    if (!fullname.trim()) {
      router.push(pathname);
    }
  }, [fullname, router, pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullname.trim()) {
      router.push(pathname + "?" + createQueryString("fullname", fullname));
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
        apiEndpoint: "leads",
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
            placeholder="Fullname"
            value={fullname}
            onChange={handleSearch}
          />
          <FormBtn text="Search" />
        </Form>
        <div className="flex"></div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5}>
                  <p className="text-center"> Loading...</p>
                </td>
              </tr>
            ) : leads ? (
              leads.map((lead: Lead) => (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td>{lead.fullname}</td>
                  <td>{lead.email}</td>
                  <td>
                    <FormSwitch
                      onChange={(e) => handleUpdate(e, lead.id, !lead.active)}
                      value={lead.active}
                    />
                  </td>
                  <td>
                    <div className="flex justify-start items-center gap-2">
                      <button
                        onClick={() => handleDelete(lead.id)}
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
                <td colSpan={5}>
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

export default LeadsWrapper;
