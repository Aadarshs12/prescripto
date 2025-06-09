"use client";
import React from "react";
import { doctors } from "../../../public/images/assets";
import Image from "next/image";
import Link from "next/link";
import { specialityData } from "../../../public/images/assets";
import { motion } from "framer-motion";

const DoctorsPage = () => {
  return (
    <section className="pb-5">
      <span className="text-gray-600 text-lg">
        Browse through the doctors specialist.
      </span>
      <div className="flex md:flex-row flex-col gap-8">
        <div className="xl:w-1/6 lg:w-1/5 md:w-1/4 w-full flex flex-col gap-4 mt-4">
          {specialityData.map((doc, index) => (
            <Link
              key={index}
              href={`/doctors/${doc?.speciality.toLowerCase()}`}
            >
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.4, duration: 0.5 }}
                className="border text-gray-600 hover:text-teal-700 hover:border-teal-700 border-gray-300 rounded-sm px-3 py-1 hover:cursor-pointer hover:bg-sky-100 "
              >
                <span className="capitalize">{doc?.speciality}</span>
              </motion.div>
            </Link>
          ))}
        </div>
        <div className="xl:w-5/6 lg:w-4/5 md:w-3/4 w-full mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {doctors.map((doc, index) => (
              <Link
                href={`/appointment/${doc?._id.toLowerCase()}`}
                key={index}
                className="flex flex-col gap-0  border rounded-lg border-teal-700 hover:translate-y-[-10px] transition-all duration-500 hover:cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.3, duration: 0.5 }}
                  className="bg-sky-100 rounded-lg rounded-b-none"
                >
                  <Image
                    className="w-full"
                    src={doc.image}
                    alt="doctor image"
                  />
                </motion.div>
                <div className="py-2 px-4 flex flex-col items-start">
                  <p className="text-green-500 flex items-center gap-1">
                    <span className="bg-green-500 rounded-full h-2 w-2"></span>{" "}
                    Available
                  </p>
                  <h3 className=" text-lg">{doc.name}</h3>
                  <p className="text-sm text-gray-600">{doc.speciality}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsPage;
