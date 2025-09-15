"use client";
import React from "react";
import Pagination from "@/app/components/Dashboard/Pagination/Pagination";
import {
  Form,
  FormBtn,
  FormControl,
  FormSwitch,
} from "@/app/components/Dashboard/Form/Form";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import useConnect from "./connect";
import { Technology } from "@/app/types/store/technologies";

const TechnologiesWrapper = () => {
  const {
    technologies,
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
            placeholder="Name"
            value={name}
            name="name"
            onChange={handleSearch}
          />
          <FormBtn text="Search" />
          <button onClick={handleFilterReset} className="form-button">
            Reset
          </button>
        </Form>
        <div className="flex">
          <Link
            href={"/dashboard/technologies/create"}
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
              <th>Icon</th>
              <th>Category</th>
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
            ) : technologies ? (
              technologies.map((technologies: Technology) => (
                <tr key={technologies.id}>
                  <td>{technologies.id}</td>
                  <td>{technologies.name}</td>
                  <td><i className={technologies.icon}></i></td>
                  <td>{technologies.category_id}</td>
                  <td>
                    <FormSwitch
                      onChange={(e) =>
                        handleUpdate(e, technologies.id, !technologies.active)
                      }
                      value={technologies.active}
                    />
                  </td>
                  <td>
                    <div className="flex justify-start items-center gap-2">
                      <Link
                        href={`/dashboard/technologies/edit/${technologies.id}`}
                        className="action-btn"
                      >
                        <CiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(technologies.id)}
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

export default TechnologiesWrapper;
