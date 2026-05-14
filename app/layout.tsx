import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppHeader from "@/components/organisms/AppHeader";
import { userProfile } from "@/lib/profile";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pactr",
  description: "Accountability for groups",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await userProfile();

  if (!profile) redirect("/sign-in");

  const group = await prisma.group.findFirst({
    where: {
      OR: [{ ownerId: profile.userId }, { memberId: profile.userId }],
    },
  });

  return (
    <html
      lang="en"
      className={cn("h-full dark", "antialiased", geistSans.variable, "font-sans", jetbrainsMono.variable)}
    >
      <body className="min-h-full flex flex-col">
        {profile && group && <AppHeader />}
        {children}
      </body>
    </html>
  );
}
