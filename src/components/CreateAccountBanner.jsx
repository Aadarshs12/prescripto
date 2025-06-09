"use client";

import React from "react";
import Image from "next/image";
import { assets } from "../../public/images/assets";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CreateAccountBanner = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref} 
      style={{
        backgroundImage: `radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(36, 36, 36,0.04) 0%, rgba(36, 36, 36,0.04) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),linear-gradient(90deg, rgb(34, 222, 237),rgb(135, 89, 215))`,
      }}
      className="my-6 rounded-lg"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center p-16 pb-0">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="w-full lg:w-1/2 flex flex-col gap-4"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white">
            Book Appointment With 100+ Trusted Doctors
          </h2>
          <Link
            href={"/login"}
            className="transition-all duration-500 hover:scale-105 w-fit text-center"
          >
            <button className="flex items-center bg-secondary text-black font-medium px-4 py-2 rounded-full bg-white w-fit">
              Create Account
              <Image
                className="ml-2 w-4 h-4"
                src={assets?.arrow_icon}
                alt="arrow"
              />
            </button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="w-full mt-6 lg:mt-0 md:w-1/2 lg:w-[370px] relative"
        >
          <Image
            className="w-full max-w-md"
            src={assets?.appointment_img}
            alt="appointment"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CreateAccountBanner;