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
  const { handleSubmit, handleChange, values, categoryList } = useConnect();

  return (
    <section className="project-create h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Service Edit" backlink="/dashboard/services" />
        <Form direction="y" width="50" onSubmit={handleSubmit}>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="text"
              placeholder="Landing page"
              label={"Name"}
              onChange={handleChange}
              value={values.name}
              name="name"
              required={true}
              width="full"
            />
            <FormSelect
              placeholder="Select Category"
              label={"Category"}
              onChange={handleChange}
              value={values.category_id && values.category_id.toString()}
              options={categoryList ? categoryList : []}
              name="category_id"
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
