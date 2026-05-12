import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/molecules/Card";
import { Field, FieldLabel } from "@/components/organisms/Field";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/molecules/InputOtp";
import { Button } from "@/components/atoms/Button";

interface JoinGroupSectionProps {
  setAction: React.Dispatch<React.SetStateAction<"" | "create" | "join">>;
}

export default function JoinGroupSection({ setAction }: JoinGroupSectionProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Join a Group</CardTitle>
        <CardDescription>Enter the code provided by your accountability partner.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel>Group Code</FieldLabel>
          <InputOTP maxLength={6} id="otp-verification" className="mx-auto" required>
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
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant={"outline"} className="flex-1" onClick={() => setAction("")}>
          Back
        </Button>
        <Button className="flex-1">Join Group</Button>
      </CardFooter>
    </Card>
  );
}
