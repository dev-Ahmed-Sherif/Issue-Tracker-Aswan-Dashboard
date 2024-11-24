"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";

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
} from "./ui/form";
import { Login } from "@/actions/login";

const loginSchema = z.object({
  name: z.string().min(1, { message: "Please Enter Your Name Or Number" }),
  password: z.string().min(1, { message: "Please Enter Your Password" }),
});
export function LoginForm() {
  // useTransition used disable form fields when call back-end
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const { toast } = useToast();

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
          // if (data?.error) {
          //   toast({
          //     variant: "destructive",
          //     title: "Something went wrong!",
          //     description: "Name or Phone Number Or Password is incorrect",
          //     action: <ToastAction altText="Try again">Try again</ToastAction>,
          //   });
          // }
          toast({
            description: "🎉 Login Successfully.",
          });
        })
        .catch((err) => {
          console.log(err.message, typeof err.message);
          if (err.message.includes("401") || err.message.includes("404")) {
            toast({
              variant: "destructive",
              title: "Something went wrong!",
              description: "Name or Phone Number Or Password is incorrect",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }
        });
    });
  };

  return (
    <Card className="mx-auto max-w-sm w-2/3">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your Name Or Phone Number</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel>Name</FormLabel>
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
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/reset"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot Password ?
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
                  className="w-full my-4"
                >
                  Login
                </Button>
              </form>
            </Form>
            {/* <Label htmlFor="email">Name Or Phone Number</Label>
            <Input
              id="email"
              type="text"
              placeholder="Ahmed Or 0110111119"
              required
            /> */}
          </div>
          {/* <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              placeholder="***********"
              type="password"
              required
            />
          </div>*/}
          {/* <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button> */}
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </div>
        {/* <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
}
