import React from "react";
import * as z from "zod/v3";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../molecules/Card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./Field";
import Input from "../atoms/Input";
import { Button } from "../atoms/Button";
import { prisma } from "@/lib/db";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

interface CreateGroupSectionProps {
  setAction: React.Dispatch<React.SetStateAction<"" | "create" | "join">>;
}

const formSchema = z.object({
  name: z.string().min(1, "Group name is required.").max(32, "Group name must be at most 32 characters."),
});

export default function CreateGroupSection({ setAction }: CreateGroupSectionProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/group/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to add verb");
      }

      const verb = await res.json();

      console.log("Verb added:", verb);

      // Optionally reset the form or provide feedback to the user here
      form.reset();
      router.refresh();
    } catch (error) {}
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create a Group</CardTitle>
        <CardDescription>Name your accountability group.</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-create-group" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-group-name">Group Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-group-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. Fitness Buddies, Study Group"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex gap-2 relative">
        <Button variant={"outline"} className="flex-1" onClick={() => setAction("")}>
          Back
        </Button>
        <Button className="flex-1" type="submit" form="form-create-group">
          Create Group
        </Button>
      </CardFooter>
    </Card>
  );
}
