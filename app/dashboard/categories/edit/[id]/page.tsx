"use client";
import { Breadcrumb } from "@/app/components";
import {
  Form,
  FormBtn,
  FormControl,
} from "@/app/components/Dashboard/Form/Form";
import { FaSave } from "react-icons/fa";
import useConnect from "./connect";

const Page = () => {
  const {
    handleSubmit,
    handleChange,
    values: { name },
  } = useConnect();

  return (
    <section className="category-edit h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Categories Edit" backlink="/dashboard/categories" />
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
          <FormBtn text="save" icon={<FaSave />} />
        </Form>
      </div>
    </section>
  );
};

export default Page;
