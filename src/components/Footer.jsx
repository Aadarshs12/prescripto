"use client";
import Image from "next/image";
import React from "react";
import { assets } from "../../public/images/assets";
import Link from "next/link";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <section ref={ref} className="pt-10 overflow-hidden pb-6">
      <div className="flex flex-col lg:flex-row mb-6">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="w-full flex flex-col gap-4 md:1/2"
        >
          <Image
            className="w-44"
            src={assets?.logo}
            alt="logo"
            width={200}
            height={100}
          />
          <p className="w-full text-sm leading-6 text-gray-600 md:w-2/3">
            Prescripto is a doctor portal website that allows you to book
            appointments, view doctors' qualifications, addresses, experience,
            and more. Easily find the right healthcare professionals and
            schedule consultations with convenience.
          </p>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="w-full mt-6 lg:mt-0 flex lg:flex-row flex-col gap-7 justify-between lg:justify-around md:1/2"
        >
          <div>
            <h4 className="text-xl font-semibold">COMPANY</h4>
            <ul className="flex flex-col gap-2 mt-6">
              <li className="text-sm hover:underline hover:text-[#5f6fff] hover:cursor-pointer text-gray-600">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="text-sm hover:underline hover:text-[#5f6fff] hover:cursor-pointer text-gray-600">
                <Link href={"/about"}>About Us</Link>
              </li>
              <li className="text-sm hover:underline hover:text-[#5f6fff] hover:cursor-pointer text-gray-600">
                <Link href={"/delivery"}>Delivery</Link>
              </li>
              <li className="text-sm hover:underline hover:text-[#5f6fff] hover:cursor-pointer text-gray-600">
                <Link href={"/privacy"}>Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold">GET IN TOUCH</h4>
            <ul className="flex flex-col gap-2 mt-6">
              <li className="text-sm flex gap-1 items-center hover:underline hover:text-[#5f6fff] hover:cursor-pointer text-gray-600">
                <Link className="flex gap-1 items-center" target="_blank" href={"https://www.instagram.com/_aadarshrajput_"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="gradient-text">@_aadarshrajput_</span>
                </Link>
              </li>

              <li className="text-sm flex gap-1 items-center hover:underline hover:text-[#5f6fff] hover:cursor-pointer text-gray-600">
                <a
                  href="mailto:aadarshs500@gmail.com"
                  className="flex items-center gap-1"
                >
                  <Mail />
                  <span className="gradient-text2">aadarshs500@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.5 }}
        className="border-t border-gray-300"
      >
        <div className="text-center mt-5">
          Created with 💖 by{" "}
          <span className="font-semibold text-blue-500">Aadarsh Singh</span> -
          All Right Reserved.
        </div>
      </motion.div>
    </section>
  );
};

export default Footer;
