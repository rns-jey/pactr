"use client";

import { Button } from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/molecules/Card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/molecules/InputOtp";
import { Field, FieldLabel } from "@/components/organisms/Field";
import { UserPlus, UsersIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [action, setAction] = useState<"create" | "join" | "">("");

  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center gap-4">
      {action === "" && (
        <>
          <div>
            <h2 className="font-semibold text-center text-2xl">Welcome, User!</h2>
            <p className="text-center text-muted-foreground">
              Let&apos;s get you connected with an accountability partner
            </p>
          </div>

          <Card className="cursor-pointer hover:bg-muted w-full min-h-24 max-w-sm" onClick={() => setAction("create")}>
            <CardContent className="flex items-center gap-2">
              <div>
                <UsersIcon className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-semibold text-base">Create a Group</h3>
                <p>Start a new accountability group and invite your friends to join you on your journey.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted w-full min-h-24 max-w-sm" onClick={() => setAction("join")}>
            <CardContent className="flex items-center gap-2 my-auto">
              <div>
                <UserPlus className="w-10 h-10" />
              </div>

              <div className="">
                <h3 className="font-semibold text-base">Join a Group</h3>
                <p>Enter a code to join an existing accountability group.</p>
              </div>
            </CardContent>
          </Card>

          <Button variant={"outline"} className="w-full max-w-sm">
            Sign out
          </Button>
        </>
      )}

      {action === "create" && (
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
      )}

      {action === "join" && (
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
      )}
    </div>
  );
}
