import React from "react";
import { useForm } from "react-hook-form";
import { dealerApi } from "../../../API";

export default function AccountForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    const response = await dealerApi.post("/login", data)
    console.log(response.data)
  };

  return (
    <div>
      <input type="checkbox" id="my-modal-4" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box w-11/12 max-w-3xl h-fit bg-white text-slate-900">
          <label
            for="my-modal-4"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="w-full px-4 mt-8 flex flex-col justify-center items-center">
            <p className="text-4xl font-bold">Login</p>
            <form
              className="w-full flex flex-col mt-12 px-16 pb-16"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label
                htmlFor="Email"
                className="py-2 pl-4 text-xl font-bold font-encode"
              >
                Email
              </label>
              <input
                type="text"
                className="w-full px-8 py-4 font-encode border border-slate-500 rounded-full"
                placeholder="john.doe@mail.com"
                name="email"
                {...register("email")}
              />
              <label
                htmlFor="Email"
                className="mt-6 py-2 pl-4 text-xl font-bold font-encode"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-8 py-4 font-encode border border-slate-500 rounded-full"
                placeholder="myVerySecretPassword"
                name="password"
                {...register("password")}
              />
              <button
                type="submit"
                className="mt-12 text-lg font-encode font-bold text-white w-full rounded-full py-4 bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
