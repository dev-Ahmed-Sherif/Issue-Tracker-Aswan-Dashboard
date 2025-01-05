"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Login } from "@/actions/auth";

const loginSchema = z.object({
  name: z.string().min(1, { message: "Please Enter Your Name Or Number" }),
  password: z.string().min(1, { message: "Please Enter Your Password" }),
});
export function LoginForm() {
  // useTransition used disable form fields when call back-end
  const [isPending, startTransition] = useTransition();
  // const [error, setError] = useState<string | undefined>("");

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(() => {
      Login(values)
        .then((data) => {
          console.log(data);
          // toast({
          //   description: "🎉 Login Successfully.",
          // });
          // router.refresh();
          setTimeout(() => {
            router.push("/dashboard");
          }, 700);
        })
        .catch((err) => {
          console.log(err.message, typeof err.message);
          if (err.message.includes("401") || err.message.includes("404")) {
            toast({
              variant: "destructive",
              title: "حدث خطأ !",
              description: "الأسم أو رقم الهاتف أو الباسورد غير صحيح",
              action: (
                <ToastAction altText="Try again">حاول مره اخرى</ToastAction>
              ),
            });
          } else {
            toast({
              variant: "destructive",
              title: "حدث خطأ !",
              description: "حدث خطأ مجهول",
              action: (
                <ToastAction altText="Try again">حاول مره اخرى</ToastAction>
              ),
            });
          }
        });
    });
  };

  return (
    <Card className="mx-auto max-w-sm w-2/3">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
        <CardDescription>قم بأدخال الاسم أو رقم الهاتف المحمول</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormLabel>الاسم أو رقم الهاتف المحمول</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="my-4">
                    <div className="flex items-center">
                      <FormLabel>كلمة المرور</FormLabel>
                      <Link
                        href="/reset"
                        className="mr-auto inline-block text-sm underline"
                      >
                        {/* Forgot Password ? */}
                        هل نسيت كلمة المرور ؟
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="*********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full my-4 font-semibold text-lg"
              >
                تسجيل الدخول
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
