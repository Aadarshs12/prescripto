"use client";

import React from "react";
import Image from "next/image";
import { specialityData } from "../../public/images/assets";
import Link from "next/link";
import { motion } from "framer-motion";

const FindBySpeciality = () => {
  return (
    <section id="findBySpeciality" className="py-10">
      <div className="text-center flex flex-col gap-5">
        <motion.h2
          className="text-3xl font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Find by Speciality
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Simply browse through our extensive list of trusted doctors,{" "}
          <span className="lg:block">
            schedule your appointment hassle-free.
          </span>
        </motion.p>
        <div className="flex gap-5 flex-shrink-0 items-center flex-grow-0 flex-wrap justify-center">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              href={`/doctors/${item?.speciality.toLowerCase()}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.3, duration: 0.5 }}
                className="flex items-center flex-col hover:translate-y-[-10px] transition-all duration-500 hover:text-[#5f6fff] hover:cursor-pointer"
              >
                <Image
                  className="lg:w-24 md:w-20 w-16"
                  src={item.image}
                  alt={item.speciality}
                  height={100}
                  width={100}
                />
                <span className="text-xs capitalize">{item.speciality}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindBySpeciality;
