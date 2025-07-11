"use client";

import React from "react";
import { doctors } from "../../public/images/assets";
import Image from "next/image";
import Arrow from "../../public/images/arrow_icon.svg";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TopDoctors = () => {
  return (
    <section className="py-10">
      <div className="text-center flex flex-col gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-3xl"
        >
          Top Doctors to Book
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Simply browse through our extensive list of trusted{" "}
          <span className="lg:block">doctors.</span>
        </motion.p>

        {/* Grid layout for large screens */}
        <div className="lg:grid hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {doctors.slice(0, 8).map((doc, index) => (
            <Link
              href={`/appointment/${doc?._id.toLowerCase()}`}
              key={index}
              className="flex flex-col gap-0 border rounded-lg border-teal-700 transition-all duration-500 hover:cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.3, duration: 0.5 }}
                className="bg-sky-100 rounded-lg rounded-b-none"
              >
                <Image className="w-full" src={doc?.image} alt="doctor image" />
              </motion.div>
              <div className="py-2 px-4 flex flex-col items-start">
                <p className="text-green-500 flex items-center gap-1">
                  <span className="bg-green-500 rounded-full h-2 w-2"></span>{" "}
                  Available
                </p>
                <h3 className="text-lg">{doc?.name}</h3>
                <p className="text-sm text-gray-600">{doc?.speciality}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="lg:hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper"
          >
            {doctors.slice(0, 8).map((doc, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={`/appointment/${doc?._id.toLowerCase()}`}
                  className="flex flex-col gap-0 border rounded-lg border-teal-700 hover:translate-y-[-10px] transition-all duration-500 hover:cursor-pointer"
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
                      src={doc?.image}
                      alt="doctor image"
                      priority={index < 3}
                    />
                  </motion.div>
                  <div className="py-2 px-4 flex flex-col items-start">
                    <p className="text-green-500 flex items-center gap-1">
                      <span className="bg-green-500 rounded-full h-2 w-2"></span>{" "}
                      Available
                    </p>
                    <h3 className="text-lg">{doc?.name}</h3>
                    <p className="text-sm text-gray-600">{doc?.speciality}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href={"/doctors"}>
          <motion.button
            whileHover={{
              rotate: [0, 2, -2, 2, -2, 0],
              transition: { duration: 0.4 },
            }}
            className="bg-sky-100 flex justify-center gap-2 items-center text-black font-medium px-5 py-2 rounded-full"
          >
            more
            <Image className="w-3" src={Arrow} alt="arrow" />
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default TopDoctors;
