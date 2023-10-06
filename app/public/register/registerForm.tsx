"use client";

import { useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import prisma from "@/utils/prisa";
import { useRouter } from "next/navigation";

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
}

const resolver: Resolver<FormValues> = async (values: any) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  }
}

const prismaClient = prisma();

export default function RegisterForm(props) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver })

    const onSubmit = handleSubmit(async (data) => {
        let res = await fetch(window.location.origin + "/public/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.firstName + " " + data.lastName,
                email: data.email,
            }),
        });

        let json = await res.json();

        if (json.error) {
            console.log(json.error)
        } else {
            router.push("/api/auth/signin");
        }
    })

    return(
        <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <input {...register("firstName")} className="input input-bordered w-full max-w-xs" placeholder="First Name" />
                <input {...register("lastName")} className="input input-bordered w-full max-w-xs" placeholder="Last Name" />
                <input {...register("email")} className="input input-bordered w-full max-w-xs col-span-2" placeholder="Email Address" />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    );
};
;

