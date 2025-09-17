"use client";
import React from "react";
import useConnect from "./connect";
import Pagination from "@/app/components/Dashboard/Pagination/Pagination";
import {
  Form,
  FormBtn,
  FormControl,
  FormSwitch,
} from "@/app/components/Dashboard/Form/Form";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const CategoriesWrapper = () => {
  const {
    categories,
    isLoading,
    handleDelete,
    handleSearch,
    name,
    handleSubmit,
    handleUpdate,
    handleFilterReset,
  } = useConnect();

  return (
    <div className="data-table-container">
      <div className="flex justify-between items-stretch">
        <Form width="[300px]" onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Category Name"
            value={name || ""}
            onChange={handleSearch}
            name="name"
          />
          <FormBtn text="Search" />
          <button onClick={handleFilterReset} className="form-button">
            Reset
          </button>
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
