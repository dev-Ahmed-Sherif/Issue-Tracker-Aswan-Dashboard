"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";

import { SizeColumn, columns } from "@/components/computer-issue/columns";

type ClientProps = {
  // data: SizeColumn[];
  data: any[];
};

const Client = ({ data }: ClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between p-6">
        <Heading
          title={`المشاكل الفنية (${data})`}
          description="قم بأدارة المشاكل الفنية وحلولها"
        />
        <Button
          onClick={() => {
            router.push(`/computerIssues/new`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          إضافة جديد
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default Client;
