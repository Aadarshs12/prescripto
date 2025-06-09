"use client";
import React from "react";
import Image from "next/image";
import { assets } from "../../public/images/assets";
import { motion } from "framer-motion";

import Link from "next/link";

const Banner = () => {
  const scrollToSection = () => {
    document.getElementById("findBySpeciality")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      style={{
        backgroundImage: `radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(36, 36, 36,0.04) 0%, rgba(36, 36, 36,0.04) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),linear-gradient(90deg, rgb(34, 222, 237),rgb(135, 89, 215))`,
      }}
      className="p-8 pb-0 lg:p-12 lg:pb-0 rounded-lg h-auto"
    >
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col justify-center gap-4 md:pb-3"
        >
          <h1 className="text-white text-4xl lg:text-5xl font-bold">
            Book Appointment With Trusted Doctors
          </h1>
          <div className="flex lg:flex-row flex-col items-center gap-4">
            <Image
              className="w-28"
              src={assets?.group_profiles}
              alt="groupPic"
              width={100}
            />
            <p className="text-zinc-100 text-center lg:text-left">
              Simply browse through our extensive list of trusted doctors,
              <span className="lg:block">
                schedule your appointment hassle-free.
              </span>
            </p>
          </div>
          <Link
            onClick={scrollToSection}
            href={"#findBySpeciality"}
            passHref
            className="transition-all duration-500 hover:scale-105 w-fit text-center"
          >
            <div className="flex justify-center lg:justify-start">
              <button className="bg-white text-gray-700 flex items-center gap-2 px-5 py-3 rounded-full">
                Book Appointment
                <Image className="w-3" src={assets?.arrow_icon} alt="arrow" />
              </button>
            </div>
          </Link>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x:   0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex items-end justify-center lg:justify-end h-auto"
        >
          <Image
            className="w-full h-auto max-h-[400px] lg:max-h-none"
            src={assets?.header_img}
            alt="doctors"
            width={500}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
