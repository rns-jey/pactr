import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/molecules/Card";
import { Field, FieldGroup, FieldLabel } from "@/components/organisms/Field";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/molecules/InputOtp";
import { Button } from "@/components/atoms/Button";
import z from "zod/v3";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

interface JoinGroupSectionProps {
  setAction: React.Dispatch<React.SetStateAction<"" | "create" | "join">>;
}

const formSchema = z.object({
  code: z.string(),
});

export default function JoinGroupSection({ setAction }: JoinGroupSectionProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/group/join", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const contentType = res.headers.get("content-type");
      const responseData = contentType?.includes("application/json") ? await res.json() : null;
      if (!res.ok) {
        throw new Error("Failed to join group");
      }
      console.log("Group created:", responseData);
      // Optionally reset the form or provide feedback to the user here
      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      //const message = error instanceof Error ? error.message : "Something went wrong";
      // example: show toast or set local error state
      // toast.error(message);
      // setError(message);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Join a Group</CardTitle>
        <CardDescription>Enter the code provided by your accountability partner.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-join-group" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="group-join-code">Group Code</FieldLabel>
                  <InputOTP
                    id="group-join-code"
                    value={field.value ?? ""}
                    onChange={(value) => field.onChange(value.toUpperCase())}
                    onBlur={field.onBlur}
                    maxLength={6}
                    className="mx-auto"
                  >
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 uppercase *:data-[slot=input-otp-slot]:w-13 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator className="mx-2" />
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 uppercase *:data-[slot=input-otp-slot]:w-13 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button type="button" variant={"outline"} className="flex-1" onClick={() => setAction("")}>
          Back
        </Button>
        <Button className="flex-1" type="submit" form="form-join-group">
          Join Group
        </Button>
      </CardFooter>
    </Card>
  );
}
