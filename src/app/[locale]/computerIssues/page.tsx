import { getComputerIssues } from "@/actions/computerIssueService";

import Client from "@/components/computer-issue/client";

const ComputerIssues = () => {
  const getData = getComputerIssues();
  return (
    <div>
      <Client data={getData as any} />
      {/* <Button type="submit" onClick={() => getData()}>
        {" "}
        test{" "}
      </Button> */}
    </div>
  );
};

export default ComputerIssues;
