import { getComputerIssues } from "@/actions/computerIssueService";

import Client from "@/components/computer-issue/client";

const ComputerIssues = async () => {
  const getData = await getComputerIssues();
  return (
    <>
      <Client data={getData.result.rowCount as any} />
    </>
  );
};

export default ComputerIssues;
