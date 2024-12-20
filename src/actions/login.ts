"use server";

import * as z from "zod";
import axios from "axios";
import { cookies } from "next/headers";

import { LoginSchema } from "@/schemas";

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  //   console.log("name: " + values.name);
  //   console.log("password: " + values.password);
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
        // tenantId: "FBAFD0D4-A926-4E12-85B0-59418D342111",
        tenantId: `${process.env.TENANT_ID}`,
      },
    }
  );
  try {
    // console.log(res.headers["set-cookie"]);
    // console.log(typeof res.headers["set-cookie"]);
    // console.log(
    //   res.headers["set-cookie"]?.[0].slice(
    //     0,
    //     res.headers["set-cookie"]?.[0].indexOf("=")
    //   )
    // );
    // console.log(res.data.result.accessToken);
    // console.log(res.data.result.refreshToken);

    const backEndCookies = await cookies();

    const accessTokenBackName = res.headers["set-cookie"]?.[0].slice(
      0,
      res.headers["set-cookie"]?.[0].indexOf("=")
    );
    const accessTokenBackValue = res.data.result.accessToken;

    const refreshTokenBackName = res.headers["set-cookie"]?.[1].slice(
      0,
      res.headers["set-cookie"]?.[1].indexOf("=")
    );
    const refreshTokenBackValue = res.data.result.refreshToken;

    backEndCookies.set({
      name: `${accessTokenBackName}`,
      value: `${accessTokenBackValue}`,
      httpOnly: true,
      path: "/",
    });
    backEndCookies.set({
      name: `${refreshTokenBackName}`,
      value: `${refreshTokenBackValue}`,
      httpOnly: true,
      path: "/",
    });
    // console.log(res);
    return { data: res.data };
    // return { data: res };
  } catch (err) {
    return { error: "test" };
  }
};
