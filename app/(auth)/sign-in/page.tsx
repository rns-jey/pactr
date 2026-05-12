"use client";

import * as z from "zod/v3";

import { useActionState } from "react";
import { signInWithEmail } from "./actions";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/molecules/Card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/organisms/Field";
import Input from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-email">Email</FieldLabel>
                  <Input {...field} id="form-email" aria-invalid={fieldState.invalid} placeholder="m@example.com" />
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="form-password">Password</FieldLabel>
                    <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input {...field} id="form-password" aria-invalid={fieldState.invalid} type="password" />
                </Field>
              )}
            />

            {state?.error && <div className="rounded-md px-3 py-2 text-sm text-red-500">{state.error}</div>}

            <Field>
              <Button type="submit" disabled={isPending}>
                Login
              </Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link href={"/sign-up"}>Sign up</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
