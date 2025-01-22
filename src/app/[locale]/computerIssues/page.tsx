import { getComputerIssues } from "@/actions/computerIssue/computerIssueService";

import Client from "@/components/computer-issue/client";

const ComputerIssues = async () => {
  const getData = await getComputerIssues();
  // console.log(getData.result.queryable);
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Client data={getData.result.queryable} />
    </main>
  );
};

export default ComputerIssues;
