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
