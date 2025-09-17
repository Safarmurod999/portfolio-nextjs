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
import { Projects } from "@/app/types/store/projects";

const ProjectsWrapper = () => {
  const {
    projects,
    isLoading,
    handleDelete,
    handleSearch,
    title,
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
            placeholder="Project Title"
            value={title || ""}
            onChange={handleSearch}
            name="title"
          />
          <FormBtn text="Search" />
          <button onClick={handleFilterReset} className="form-button">
            Reset
          </button>
        </Form>
        <div className="flex">
          <Link
            href={"/dashboard/projects/create"}
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
              <th>Title</th>
              <th>Category</th>
              <th>Technologies</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8}>
                  <p className="text-center"> Loading...</p>
                </td>
              </tr>
            ) : projects ? (
              projects.map((project: Projects) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.title}</td>
                  <td>{project.category_id}</td>
                  <td>{project.technologies}</td>
                  <td>
                    {" "}
                    <FormSwitch
                      onChange={(e) =>
                        handleUpdate(e, project.id, !project.active)
                      }
                      value={project.active}
                    />
                  </td>
                  <td>
                    <div className="flex justify-start items-center gap-2">
                      <Link
                        href={`/dashboard/projects/edit/${project.id}`}
                        className="action-btn"
                      >
                        <CiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
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
                <td colSpan={8}>
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

export default ProjectsWrapper;
