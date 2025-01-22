import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
export default async function Home() {
  const backEndCookies = await cookies();
  const access = backEndCookies.get(`${process.env.ACCESS_TOKEN_COOKIE}`);
  if (access) {
    redirect("/ar/dashboard");
  }

  return (
    <main className="flex min-h-screen w-full flex-col">
      <LoginForm />
    </main>
  );
}
