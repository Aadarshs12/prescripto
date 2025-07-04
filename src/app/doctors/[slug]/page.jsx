import React from "react";
import Index from "@/components/doctors/slug/Index";

const Page = ({ params }) => {
  const slug = params?.slug;
  const decodedSlug = decodeURIComponent(slug);

  return <Index slug={decodedSlug} />;
};

export default Page;
