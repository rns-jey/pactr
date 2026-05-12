import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../molecules/Card";
import { Field, FieldLabel } from "./Field";
import Input from "../atoms/Input";
import { Button } from "../atoms/Button";

interface CreateGroupSectionProps {
  setAction: React.Dispatch<React.SetStateAction<"" | "create" | "join">>;
}

export default function CreateGroupSection({ setAction }: CreateGroupSectionProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create a Group</CardTitle>
        <CardDescription>Name your accountability group.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel>Group Name</FieldLabel>
          <Input placeholder="eg. Fitness Buddies, Study Group" />
        </Field>
      </CardContent>
      <CardFooter className="flex gap-2 relative">
        <Button variant={"outline"} className="flex-1" onClick={() => setAction("")}>
          Back
        </Button>
        <Button className="flex-1">Create Group</Button>
      </CardFooter>
    </Card>
  );
}
