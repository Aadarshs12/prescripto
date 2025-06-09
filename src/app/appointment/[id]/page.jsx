import Index from "@/components/appointment/Index";
import React from "react";

const Page = async ({ params }) => {
  const id = (await params)?.id;
  const decodeId = decodeURIComponent(id || "");

  return <Index id={decodeId} />;
};

export default Page;