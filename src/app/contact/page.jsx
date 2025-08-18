"use client"
import React from "react";
import { assets } from "../../../public/images/assets";
import Image from "next/image";
import { toast } from "sonner";
const page = () => {
  const handlejob = () => {
    toast("No jobs openings available", {
            action: {
              label: "Close",
              onClick: () => toast.dismiss(),
            },
          });
  };
  return (
    <section>
      <div className="text-center">
        <h1 className="text-3xl">
          Contact <span className="font-bold text-[#5f6fff]">Us</span>
        </h1>
      </div>
      <div className="flex lg:flex-row flex-col mt-5 gap-10 items-center">
        <div className="lg:w-1/2 w-full">
          <Image
            alt="img"
            className="h-1/2"
            src={assets?.contact_image}
          ></Image>
        </div>
        <div className="lg:w-1/2 w-full text-[#4b5563] flex flex-col gap-7">
          <h3 className="font-bold text-xl">OUR OFFICE</h3>
          <div>
            <span>00000 Willms Station</span>
            <span>Suite 000, Washington, USA</span>
          </div>
          <div className="flex gap-3 lg:flex-row flex-col">
            <span>Tel: (000) 000-0000</span>
            <a href="mailto:aadarshs500@gmail.com">
              Email: aadarshs500@gmail.com
            </a>
          </div>
          <h2 className="font-semibold text-2xl">CAREERS AT PRESCRIPTO</h2>
          <p>Learn more about our teams and job openings.</p>
          <button
            onClick={handlejob}
            className="text-white bg-primary hover:bg-indigo-600 w-fit px-4 py-2 text-lg"
          >
            Explore Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default page;
