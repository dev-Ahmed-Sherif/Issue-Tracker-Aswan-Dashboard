import Image from "next/image";
import { LoginForm } from "@/components/LoginForm";
export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
