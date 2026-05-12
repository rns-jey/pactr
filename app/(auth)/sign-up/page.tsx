"use client";

import * as z from "zod/v3";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useActionState } from "react";
import { signUpWithEmail } from "./actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/molecules/Card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/organisms/Field";
import Input from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

  return (
    // <form action={formAction} className="flex flex-col gap-5 min-h-screen items-center justify-center bg-gray-900">
    //   <div className="w-sm">
    //     <h1 className="mt-10 text-center text-2xl/9 font-bold text-white">Create new account</h1>
    //   </div>

    //   <div className="flex flex-col gap-1.5 w-sm">
    //     <label htmlFor="name" className="block text-sm font-medium text-gray-100">
    //       Name
    //     </label>
    //     <input
    //       id="name"
    //       name="name"
    //       type="text"
    //       required
    //       placeholder="John Doe"
    //       className="block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-gray-500 text-white outline-1 outline-white/10 focus:outline-indigo-500"
    //     />
    //   </div>

    //   <div className="flex flex-col gap-1.5 w-sm">
    //     <label htmlFor="email" className="block text-sm font-medium text-gray-100">
    //       Email address
    //     </label>
    //     <input
    //       id="email"
    //       name="email"
    //       type="email"
    //       required
    //       placeholder="john@my-company.com"
    //       className="block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-gray-500 text-white outline-1 outline-white/10  focus:outline-indigo-500"
    //     />
    //   </div>

    //   <div className="flex flex-col gap-1.5 w-sm">
    //     <label htmlFor="password" className="block text-sm font-medium text-gray-100">
    //       Password
    //     </label>
    //     <input
    //       id="password"
    //       name="password"
    //       type="password"
    //       required
    //       placeholder="*****"
    //       className="block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-gray-500 text-white outline-1 outline-white/10  focus:outline-indigo-500"
    //     />
    //   </div>

    //   {state?.error && <div className="rounded-md px-3 py-2 text-sm text-red-500">{state.error}</div>}

    //   <button
    //     type="submit"
    //     disabled={isPending}
    //     className="flex w-sm justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400"
    //   >
    //     {isPending ? "Creating account..." : "Create Account"}
    //   </button>
    // </form>
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-name"
                    name="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="John Doe"
                  />
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-email"
                    name="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="m@example.com"
                  />
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-password">Password</FieldLabel>
                  <Input {...field} id="form-password" aria-invalid={fieldState.invalid} type="password" />
                </Field>
              )}
            />

            {state?.error && <div className="rounded-md px-3 py-2 text-sm text-red-500">{state.error}</div>}

            <Field>
              <Button type="submit" disabled={isPending}>
                Create Account
              </Button>
              <FieldDescription className="text-center">
                Already have an account? <Link href={"/sign-in"}>Sign in</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
