"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";
import axios from "axios";

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  console.log("name: " + values.name);
  console.log("password: " + values.password);
  //  Simulate server-side validation and authentication logic here
  const validatedFields = LoginSchema.safeParse(values);
  //   console.log("Validated fields: " + validatedFields);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  //   return { error: "test" };
  const res = await axios.post(
    `${process.env.BACK_END_DEV}/User/Login`,
    {
      userNameOrPhoneNumber: values.name,
      password: values.password,
    },
    {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
        tenantId: "FBAFD0D4-A926-4E12-85B0-59418D342111",
      },
    }
  );
  try {
    return { data: res.data };
  } catch (err) {
    return { error: "test" };
  }
};
