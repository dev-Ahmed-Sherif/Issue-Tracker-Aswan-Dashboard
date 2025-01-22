"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash } from "lucide-react";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import AlertModal from "@/components/modals/alert-modal";

import { useToast } from "@/hooks/use-toast";

import useToggleState from "@/hooks/use-toggle-state";

import { computerIssueSchema } from "@/schemas";

import { addComputerIssue } from "@/actions/computerIssue/computerIssueService";

type ComputerIssueFormProps = {
  initialData: any | null;
};

type ComputerIssueFormValues = z.infer<typeof computerIssueSchema>;

const ComputerIssueForm = ({ initialData }: ComputerIssueFormProps) => {
  // console.log(initialData);
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();

  const [open, toggleOpen] = useToggleState(false);
  const [loading, toggleLoading] = useToggleState(false);

  const [formSolutions, setFormSolutions] = useState<any[]>(
    initialData?.solutions
  );

  const title = initialData ? "تعديل مشكلة" : "إضافة مشكلة";
  const description = initialData ? "تعديل" : "إضافة مشكلة جديدة";
  const toastMessage = initialData ? "تعديل" : " تم الأضافة بنجاح";
  const action = initialData ? "تعديل" : "إضافة";

  // const schema = z.object({
  //   singleString: z.string().min(1, "This field is required"),
  //   solutions: z.array(z.string().min(1, "Solution cannot be empty")),
  // });

  // const { control } = useForm({});
  // const form = useForm<ComputerIssueFormValues>({
  //   resolver: zodResolver(computerIssueSchema),
  //   defaultValues: initialData || {
  //     description: "",
  //     solutions: [],
  //     typeId: `${process.env.TYPE_ID}`,
  //   },
  // });
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "solutions",
  // });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ComputerIssueFormValues>({
    resolver: zodResolver(computerIssueSchema),
    defaultValues: {
      solutions: [""],
      description: "",
      typeId: "",
    },
  });

  // console.log(errors);
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "strings",
  // });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "solutions",
  });

  // console.log(fields);

  const onSubmit = async (data: ComputerIssueFormValues) => {
    console.log(data);
    await addComputerIssue(data)
      .then(() => {
        toast({
          description: `${toastMessage}`,
        });
        router.refresh();
        setTimeout(() => {
          router.push(`/computerIssues`);
        }, 70);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "حصل خطأ ما",
        });
      });
    // try {
    //   toggleLoading();
    //   if (initialData) {
    //     await axios.patch(
    //       `/api/${params.storeId}/sizes/${params.sizeId}`,
    //       data
    //     );
    //   } else {
    //     await axios.post(`/api/${params.storeId}/sizes`, data);
    //   }
    //   router.refresh();
    //   setTimeout(() => {
    //     router.push(`/${params.storeId}/sizes`);
    //   }, 1000);
    //   toast({
    //     description: `🎉 ${toastMessage}`,
    //   });
    // } catch (err) {
    //   toast({
    //     variant: "destructive",
    //     description: "Something went wrong",
    //   });
    // } finally {
    //   toggleLoading();
    // }
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const onDelete = async () => {
    try {
      toggleLoading();
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.refresh();
      setTimeout(() => {
        router.push(`/${params.storeId}/sizes`);
      }, 1000);
      toast({
        description: "👍👍 Size deleted successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description:
          "Make sure removed all products using this billboard first!",
      });
    } finally {
      toggleLoading();
      toggleOpen();
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => toggleOpen()}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => {
              toggleOpen();
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-2">
          <label>الحلول :</label>
        </div>
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 space-x-2">
              <Controller
                name={`solutions.${index}`}
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              <Button type="button" onClick={() => remove(index)}>
                حذف
              </Button>
            </div>
          ))}
        </div>
        {errors.solutions && errors.solutions[0]?.message && (
          <p className="text-red-500">{errors.solutions[0]?.message}</p>
        )}
        {errors.solutions?.root?.message && (
          <p className="text-red-500">{errors.solutions?.root?.message}</p>
        )}
        <Button className="mt-4" type="button" onClick={() => append("")}>
          أضف حل مشكلة
        </Button>
        <div className="flex flex-col space-x-2 mt-4">
          <label>الوصف :</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <div className="hidden">
          <label>Single String:</label>
          <Controller
            name="typeId"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.typeId && (
            <p className="text-red-500">{errors.typeId.message}</p>
          )}
        </div>
        <Button type="submit" className="mt-4">
          {loading && <Loader2 className="h-6 w-6" />}
          {action}
        </Button>
      </form>
    </>
  );
};

export default ComputerIssueForm;
