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

type ComputerIssueFormProps = {
  initialData: any | null;
};

// TODO: Set Schema and Form Types in Schemas Folder
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

  const title = initialData ? "Edit Size" : "Create Size";
  const description = initialData ? "Edit a Size" : "Add New Size";
  const toastMessage = initialData ? "Size Updated" : "Create Size";
  const action = initialData ? "Save changes" : "Create Size";

  const schema = z.object({
    strings: z.array(z.string().min(1, "String cannot be empty")),
    singleString: z.string().min(1, "This field is required"),
  });

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

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { strings: [""], singleString: "" },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "strings",
  });

  // console.log(form);

  // const onSubmit = async (data: ComputerIssueFormValues) => {
  //   console.log(data);
  //     try {
  //       toggleLoading();
  //       if (initialData) {
  //         await axios.patch(
  //           `/api/${params.storeId}/sizes/${params.sizeId}`,
  //           data
  //         );
  //       } else {
  //         await axios.post(`/api/${params.storeId}/sizes`, data);
  //       }
  //       router.refresh();
  //       setTimeout(() => {
  //         router.push(`/${params.storeId}/sizes`);
  //       }, 1000);
  //       toast({
  //         description: `🎉 ${toastMessage}`,
  //       });
  //     } catch (err) {
  //       toast({
  //         variant: "destructive",
  //         description: "Something went wrong",
  //       });
  //     } finally {
  //       toggleLoading();
  //     }
  // };

  const onSubmit = (data) => {
    console.log(data);
  };

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
        {" "}
        <div className="flex items-center space-x-2">
          {" "}
          <label>Strings:</label>{" "}
        </div>{" "}
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-2">
            {" "}
            <Controller
              name={`strings.${index}`}
              control={control}
              render={({ field }) => <Input {...field} />}
            />{" "}
            <Button type="button" onClick={() => remove(index)}>
              Remove
            </Button>{" "}
          </div>
        ))}{" "}
        <Button type="button" onClick={() => append("")}>
          Add String
        </Button>{" "}
        <div className="flex items-center space-x-2 mt-4">
          {" "}
          <label>Single String:</label>{" "}
          <Controller
            name="singleString"
            control={control}
            render={({ field }) => <Input {...field} />}
          />{" "}
        </div>{" "}
        <Button type="submit" className="mt-4">
          Submit
        </Button>{" "}
      </form>
    </>
  );
};

export default ComputerIssueForm;
