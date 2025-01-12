"use client";
import { Breadcrumb } from "@/app/components";
import {
  Form,
  FormBtn,
  FormControl,
} from "@/app/components/Dashboard/Form/Form";
import { addData } from "@/app/store/mainSlice";
import { AppDispatch } from "@/app/store/store";
import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";

const Page = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newData = { name };
    dispatch(addData({ apiEndpoint: "categories", newData }));
    setName("");
  };
  return (
    <section className="category-create h-[100svh]">
      <div className="admin-container">
        <Breadcrumb
          title="Categories Create"
          backlink="/dashboard/categories"
        />
        <Form direction="y" width="50" onSubmit={handleSubmit}>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="text"
              placeholder="Frontend"
              label={"Name"}
              onChange={(e) => setName(e.target.value)}
              value={name}
              required={true}
              width="full"
            />
          </div>
          <FormBtn text="add" icon={<IoAddSharp />} />
        </Form>
      </div>
    </section>
  );
};

export default Page;
