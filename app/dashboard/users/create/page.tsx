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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newData = { username, password };
    dispatch(addData({ apiEndpoint: "users", newData }));
    setUsername("");
    setPassword("");
  };
  return (
    <section className="user-create h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Users Create" backlink="/dashboard/users" />
        <Form direction="y" width="50" onSubmit={handleSubmit}>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="text"
              placeholder="John Doe"
              label={"Username"}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required={true}
              width="full"
            />
            <FormControl
              type="text"
              placeholder="*****"
              label={"Password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
