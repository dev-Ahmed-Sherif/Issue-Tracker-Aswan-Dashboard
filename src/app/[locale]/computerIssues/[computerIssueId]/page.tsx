import { getComputerIssuesId } from "@/actions/computerIssue/computerIssueService";

import ComputerIssueForm from "@/components/computer-issue/computer-issue-form";

type ComputerIssueProps = {
  params: {
    computerIssueId: string;
  };
};

const ComputerIssuePage = async ({ params }: ComputerIssueProps) => {
  const computerIssue = await getComputerIssuesId(params.computerIssueId);

  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ComputerIssueForm initialData={computerIssue} />
      </div>
    </main>
  );
};

export default ComputerIssuePage;
