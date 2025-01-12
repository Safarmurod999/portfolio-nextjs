"use client";
import { Breadcrumb } from "@/app/components";
import {
  Form,
  FormBtn,
  FormControl,
} from "@/app/components/Dashboard/Form/Form";
import { updateData } from "@/app/store/mainSlice";
import { AppDispatch } from "@/app/store/store";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Page = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateData({
        apiEndpoint: "users",
        newData: { username, password },
        id: +id,
      })
    );
    setUsername("");
    setPassword("");
    
  };

  return (
    <section className="user-edit h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Users Edit" backlink="/dashboard/users" />
        <Form direction="y" width="50" onSubmit={handleSubmit}>
          <div className="flex w-full gap-[10px]">
            <FormControl
              type="text"
              placeholder="John Doe"
              label={"Username"}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              width="full"
            />
            <FormControl
              type="text"
              placeholder="*****"
              label={"Password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
