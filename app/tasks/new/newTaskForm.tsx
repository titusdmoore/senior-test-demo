"use client";

import { Controller, useForm, Resolver } from "react-hook-form";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { TaskStatus, Priority } from "@/utils/types";

type FormValues = {
  title: string;
  content: string;
  priority: Priority;
  status: TaskStatus;
  startAt: Date;
  endAt: Date;
  asignees: any[];
};

const resolver: Resolver<FormValues> = async (values: any) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: "Title is required.",
          },
        }
      : {},
  }
}

// export async function AssigneeField() {
//
// }

export default function NewTaskForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver })

  const onSubmit = handleSubmit(async (data) => {
    let res = await fetch(window.location.origin + "/api/task", {
      method: "POST",
      body: JSON.stringify(data),
    });

    let json = await res.json();

    console.log(json)
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-4 gap-4">
        <input {...register("title")} placeholder="Title" className="input input-bordered w-full col-span-2" />
        <select className="select select-bordered w-full">
          <option disabled selected>Task Priority</option>
          {
            Object.keys(Priority).map((priority: string, index: number) => (
              <option key={index} value={priority} className="text-capitalize">{priority}</option>
            ))
          }
        </select>
        <select className="select select-bordered w-full">
          <option disabled selected>Task Status</option>
          {
            Object.keys(TaskStatus).map((status: string, index: number) => (
              <option key={index} value={status} className="text-capitalize">{status}</option>
            ))
          }
        </select>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="startAt"
            render={({ field }) => (
              <DatePicker
                placeholderText="Start Date"
                selected={field.value}
                onChange={(date: Date) => field.onChange(date)}
                className="input input-bordered w-full relative"
              />
            )}
          />
          <Controller
            control={control}
            name="endAt"
            render={({ field }) => (
              <DatePicker
                placeholderText="Due Date"
                selected={field.value}
                onChange={(date: Date) => field.onChange(date)}
                className="input input-bordered w-full"
              />
            )}
          />
        </div>
        <textarea 
          {...register("content")} 
          placeholder="Content" 
          className="textarea textarea-bordered w-full col-span-4"></textarea>
      </div>
      <button className="btn btn-primary mt-4">Add Task</button>
    </form>
  );
}
