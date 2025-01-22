// import { UserRole } from "@prisma/client";
import * as z from "zod";

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email is Invalid",
    }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const LoginSchema = z.object({
  // name: z.string().min(1, { message: "Please Enter Your Name Or Number" }),
  name: z.string().min(1, { message: "يجب إضافة الأسم أو رقم الهاتف" }),
  // password: z.string().min(1, { message: "Please Enter Your Password" }),
  password: z.string().min(1, { message: "يجب إدخال الباسورد" }),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email is Invalid",
    }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    // role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string()),
    password: z.optional(
      z.string().min(6, {
        message: "Minimum 6 characters required",
      })
    ),
    newPassword: z.optional(
      z.string().min(6, {
        message: "Minimum 6 characters required",
      })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New Password is required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  );

export const computerIssueSchema = z.object({
  description: z.string().min(1, {
    // message: "Description is required",
    message: "وصف المشكلة مطلوب",
  }),
  solutions: z
    .array(
      z.string().min(1, {
        message: "يجب إضافة حل للمشكلة ولا يمكن أن يكون فارغ",
      })
    )
    .min(1, { message: "يجب إضافة حل واحد على الأقل" }),
  // solutions: z
  //   .array(
  //     z.string().min(1, {
  //       message: "Solution cannot be empty",
  //     })
  //   )
  //   .min(1, { message: "One Solution at least must" }),
  typeId: z.string().optional(),
});
