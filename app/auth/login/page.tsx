"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        router.push("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  return (
    // <div className="pt-[200px] w-full overflow-x-hidden flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mb-[50px]">
    //   <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //     <div className="navbar__logo flex items-center justify-center">
    //       <Link href="/">
    //         Urinov<span>.</span>
    //       </Link>
    //     </div>
    //     <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
    //       Sign in to your account
    //     </h2>
    //   </div>

    //   <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //     <form onSubmit={handleSubmit} className="space-y-6">
    //       <div>
    //         <label
    //           htmlFor="username"
    //           className="block text-sm/6 font-medium text-gray-900"
    //         >
    //           Username
    //         </label>
    //         <div className="mt-2">
    //           <input
    //             id="username"
    //             name="username"
    //             type="text"
    //             value={username}
    //             required
    //             className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //             onChange={(e) => setUsername(e.target.value)}
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <div className="flex items-center justify-between">
    //           <label
    //             htmlFor="password"
    //             className="block text-sm/6 font-medium text-gray-900"
    //           >
    //             Password
    //           </label>
    //           <div className="text-sm">
    //             <a
    //               href="#"
    //               className="font-semibold text-indigo-600 hover:text-indigo-500"
    //             >
    //               Forgot password?
    //             </a>
    //           </div>
    //         </div>
    //         <div className="mt-2">
    //           <input
    //             id="password"
    //             name="password"
    //             type="password"
    //             required
    //             autoComplete="current-password"
    //             className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <button
    //           type="submit"
    //           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //         >
    //           Sign in
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className={"sign-in"}>
      <div className="sign-in-container sm:mx-auto sm:w-full sm:max-w-sm">
        <div className={"sign-in__logo"}>
          <a href="/">
            Urinov<span>.</span>
          </a>
        </div>
        <h2 className={"sign-in__title"}>Sign in to your account</h2>

        <div className={"sign-in__form"}>
          <form onSubmit={handleSubmit}>
            <div className={"sign-in__form__input-group"}>
              <label
                htmlFor="username"
                className={"sign-in__form__input-group__label"}
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                required
                className={"sign-in__form__input-group__input"}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className={"sign-in__form__input-group"}>
              <div className={"sign-in__form__password-group"}>
                <label
                  htmlFor="password"
                  className={"sign-in__form__input-group__label"}
                >
                  Password
                </label>
                <a href="#" className={"sign-in__form__password-group__forgot"}>
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={"sign-in__form__input-group__input"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className={"sign-in__form__submit"}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
