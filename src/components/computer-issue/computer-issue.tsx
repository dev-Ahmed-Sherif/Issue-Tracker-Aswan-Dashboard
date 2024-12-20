"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  getComputerIssues,
  getComputerIssuesId,
} from "@/actions/computerIssueService";

const Client = () => {
  const getData = () => {
    getComputerIssues();
  };
  const getComputerIssue = (id: string) => {
    getComputerIssuesId(id);
  };
  return (
    <div>
      <Button type="submit" onClick={() => getData()}>
        test all
      </Button>
      <Button
        type="submit"
        onClick={() => getComputerIssue("FBAFD0D4-A926-4E12-85B0-59418D342111")}
      >
        test one
      </Button>
    </div>
  );
};

export default Client;
