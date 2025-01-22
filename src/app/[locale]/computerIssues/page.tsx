import { getComputerIssues } from "@/actions/computerIssueService";

import Client from "@/components/computer-issue/client";

const ComputerIssues = async () => {
  const getData = await getComputerIssues();
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Client data={getData.result.rowCount as any} />
    </main>
  );
};

export default ComputerIssues;
