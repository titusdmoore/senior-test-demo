"use client";

import { useForm, Resolver } from "react-hook-form";
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
                <input {...register("firstName")} className="input input-bordered w-full" placeholder="First Name" />
                <input {...register("lastName")} className="input input-bordered w-full" placeholder="Last Name" />
                <input {...register("email")} className="input input-bordered w-full col-span-2" placeholder="Email Address" />
            </div>
            <button type="submit" className="btn btn-primary mt-4">Register</button>
        </form>
    );
};
;

