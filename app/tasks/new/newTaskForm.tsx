"use client";

import { useForm, Resolver } from "react-hook-form";
import { useRouter } from "next/navigation";

import { TaskStatus, Priority } from "@/utils/types";

type FormValues = {
  title: string;
  content: string;
  priority: Priority;
  status: TaskStatus;
  startDate: Date;
  endDate: Date;
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

export default function NewTaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver })

  const onSubmit = handleSubmit(async (data) => {
  });

  return (
    <form onSubmit={onSubmit}>
    </form>
  );
}
