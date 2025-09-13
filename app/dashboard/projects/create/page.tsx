"use client";
import { Breadcrumb } from "@/app/components";
import {
  Form,
  FormBtn,
  FormControl,
  FormImage,
  FormMultiSelect,
  FormSelect,
} from "@/app/components/Dashboard/Form/Form";
import { IoAddSharp } from "react-icons/io5";
import useConnect from "./connect";

const Page = () => {
  const { handleSubmit, handleChange, setFieldValue, values } = useConnect();
  return (
    <section className="education-create h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Education Create" backlink="/dashboard/education" />
        <Form direction="y" width="50" onSubmit={handleSubmit}>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="text"
              placeholder="Landing page"
              label={"Title"}
              onChange={handleChange}
              value={values.title}
              name="title"
              required={true}
              width="full"
            />
            <FormControl
              type="text"
              placeholder="A short description"
              label={"Description"}
              onChange={handleChange}
              value={values.description}
              name="description"
              required={true}
              width="full"
            />
          </div>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="text"
              placeholder="https://your-link.com"
              label={"Link"}
              onChange={handleChange}
              value={values.link}
              name="link"
              required={true}
              width="full"
            />
            <FormSelect
              placeholder="Select Category"
              label={"Category"}
              onChange={handleChange}
              value={values.category_id.toString()}
              options={[
                { label: "Web Development", value: "1" },
                { label: "Mobile Development", value: "2" },
                { label: "Data Science", value: "3" },
              ]}
              name="category_id"
              required={true}
              width="full"
            />
          </div>
          <div className="flex w-full gap-[10px]">
            <FormMultiSelect
              placeholder="Select Technologies"
              label={"Technologies"}
              onChange={setFieldValue.bind(null, "technologies")}
              value={values.technologies}
              options={[
                { label: "JavaScript", value: 1 },
                { label: "TypeScript", value: 2 },
                { label: "React", value: 3 },
              ]}
              width="full"
            />

            <FormImage
              label={"Image"}
              onChange={handleChange}
              width="full"
              name="image"
            />
          </div>
          <FormBtn text="add" icon={<IoAddSharp />} />
        </Form>
      </div>
    </section>
  );
};

export default Page;
