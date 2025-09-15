"use client";
import { Breadcrumb } from "@/app/components";
import {
  Form,
  FormBtn,
  FormControl,
  FormSelect,
} from "@/app/components/Dashboard/Form/Form";
import { IoAddSharp } from "react-icons/io5";
import useConnect from "./connect";

const Page = () => {
  const {
    values,
    handleChange,
    handleSubmit,
    categories,
  } = useConnect();
  return (
    <section className="technology-edit h-[100svh]">
      <div className="admin-container">
        <Breadcrumb
          title="Technology Edit"
          backlink="/dashboard/technologies"
        />
        <Form direction="y" width="50" onSubmit={handleSubmit}>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="text"
              placeholder="Technology Name"
              label={"Name"}
              onChange={handleChange}
              value={values.name}
              name="name"
              required={true}
              width="full"
            />
            <FormSelect
              placeholder="Category"
              label={"Category"}
              onChange={handleChange}
              value={values.category_id}
              options={
                categories ? categories : [{ value: 0, label: "No category" }]
              }
              name="category_id"
              required={true}
              width="full"
            />
          </div>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="text"
              placeholder="Icon class from devicons"
              label={"Icon"}
              onChange={handleChange}
              value={values.icon}
              name="icon"
              required={true}
              width="full"
            />
          </div>
          <FormBtn text="save" icon={<IoAddSharp />} />
        </Form>
      </div>
    </section>
  );
};

export default Page;
