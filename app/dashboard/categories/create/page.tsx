"use client";
import { Breadcrumb } from "@/app/components";
import {
  Form,
  FormBtn,
  FormControl,
} from "@/app/components/Dashboard/Form/Form";
import { IoAddSharp } from "react-icons/io5";
import useConnect from "./connect";

const Page = () => {
  const {
    handleSubmit,
    handleChange,
    values: { name },
  } = useConnect();

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
              onChange={handleChange}
              value={name}
              name="name"
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
