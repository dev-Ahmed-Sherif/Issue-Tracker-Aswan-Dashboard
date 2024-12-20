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
    <div className="flex w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
