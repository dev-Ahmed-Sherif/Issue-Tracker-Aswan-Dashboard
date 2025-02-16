"use server";

import * as z from "zod";
import axios from "axios";
import { cookies } from "next/headers";

const addComputerIssue = async (data: any) => {
  // console.log(data);
  const backEndCookies = await cookies();
  let accessCookie = backEndCookies.get(`${process.env.ACCESS_TOKEN_COOKIE}`);
  let refreshCookie = backEndCookies.get(`${process.env.REFRESH_TOKEN_COOKIE}`);

  const typeId = data.typeId !== "" ? data.typeId : `${process.env.TYPE_ID}`;
  // console.log(typeId);
  const res = await axios.post(
    `${process.env.BACK_END_DEV}/ComputerIssueService`,
    {
      description: data.description,
      solutions: data.solutions,
      typeId: typeId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
        tenantId: "FBAFD0D4-A926-4E12-85B0-59418D342111",
        IssueTrackerAccessToken: `${accessCookie?.value}`,
        IssueTrackerRefreshToken: `${refreshCookie?.value}`,
      },
    }
  );

  // console.log("postComputerIssues:", res?.data);
  return res.data;
};

const getComputerIssues = async () => {
  const backEndCookies = await cookies();
  let accessCookie = backEndCookies.get(`${process.env.ACCESS_TOKEN_COOKIE}`);
  let refreshCookie = backEndCookies.get(`${process.env.REFRESH_TOKEN_COOKIE}`);
  const res = await axios.get(
    `${process.env.BACK_END_DEV}/ComputerIssueService`,
    {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
        tenantId: "FBAFD0D4-A926-4E12-85B0-59418D342111",
        IssueTrackerAccessToken: `${accessCookie?.value}`,
        IssueTrackerRefreshToken: `${refreshCookie?.value}`,
      },
    }
  );
  // console.log("getComputerIssues:", res?.data);
  return res.data;
};

const getComputerIssuesId = async (id: string) => {
  const backEndCookies = await cookies();
  let accessCookie = backEndCookies.get(`${process.env.ACCESS_TOKEN_COOKIE}`);
  let refreshCookie = backEndCookies.get(`${process.env.REFRESH_TOKEN_COOKIE}`);
  let res;
  if (id !== "new") {
    res = await axios.get(
      `${process.env.BACK_END_DEV}/ComputerIssueService/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
          tenantId: "FBAFD0D4-A926-4E12-85B0-59418D342111",
          IssueTrackerAccessToken: `${accessCookie?.value}`,
          IssueTrackerRefreshToken: `${refreshCookie?.value}`,
        },
      }
    );
  }

  // console.log("getByIdComputerIssue:", res?.data);
  return res?.data;
};

export { addComputerIssue, getComputerIssues, getComputerIssuesId };
