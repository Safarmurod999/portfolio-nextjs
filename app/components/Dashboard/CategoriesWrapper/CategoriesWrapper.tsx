import { useFetchData } from "@/app/hooks/useFetch";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteData, updateData } from "@/app/store/mainSlice";
import { AppDispatch } from "@/app/store/store";
import Pagination from "../Pagination/Pagination";
import { Form, FormBtn, FormControl, FormSwitch } from "../Form/Form";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { toast } from "sonner";

const CategoriesWrapper = () => {
  const [name, setName] = useState("");

  const { data: categories, isLoading, error } = useFetchData(`categories`);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: number) => {
    dispatch(deleteData({ apiEndpoint: "categories", id }));
    toast.success("Category deleted successfully", {
      position: "top-right",
      duration: 2000,
    });
  };
  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    active: boolean
  ) => {
    e.preventDefault();
    dispatch(
      updateData({
        apiEndpoint: "categories",
        newData: { active },
        id: id,
      })
    );
    toast.success("Category updated successfully", {
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
        <Form width="[300px]">
          <FormControl
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <FormBtn text="Search" />
        </Form>
        <div className="flex">
          <Link
            href={"/dashboard/categories/create"}
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4}>
                  <p className="text-center"> Loading...</p>
                </td>
              </tr>
            ) : categories ? (
              categories.map((category: Category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    {" "}
                    <FormSwitch
                      onChange={(e) =>
                        handleUpdate(e, category.id, !category.active)
                      }
                      value={category.active}
                    />
                  </td>
                  <td>
                    <div className="flex justify-start items-center gap-2">
                      <Link
                        href={`/dashboard/categories/edit/${category.id}`}
                        className="action-btn"
                      >
                        <CiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id)}
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
                <td colSpan={4}>
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

export default CategoriesWrapper;
