'use client';

import React from 'react';
import { doctors, specialityData } from '../../../../public/images/assets';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Index = ({ slug }) => {
  // Decode slug for comparison
  const decodedSlug = decodeURIComponent(slug).toLowerCase();

  // Filter doctors based on slug
  const filteredDoctors = doctors.filter(
    (doc) => doc.speciality.toLowerCase() === decodedSlug
  );

  return (
    <section className="pb-5">
      <span className="text-gray-600 text-lg">
        Browse through the doctors specialist.
      </span>
      <div className="flex md:flex-row flex-col gap-8">
        <div className="xl:w-1/6 lg:w-1/5 md:w-1/4 w-full flex flex-col gap-4 mt-4">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              href={`/doctors/${encodeURIComponent(item.speciality.toLowerCase())}`}
            >
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`border text-gray-600 hover:text-teal-700 hover:border-teal-700 border-gray-300 rounded-sm px-3 py-1 hover:cursor-pointer hover:bg-sky-100 ${
                  decodedSlug === item.speciality.toLowerCase()
                    ? 'bg-sky-100 border-teal-700 text-teal-700'
                    : ''
                }`}
              >
                <span className="capitalize">{item.speciality}</span>
              </motion.div>
            </Link>
          ))}
        </div>
        <div className="xl:w-5/6 lg:w-4/5 md:w-3/4 w-full mt-4">
          {/* Grid layout for large screens */}
          <div className="lg:grid hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doc, index) => (
              <Link
                href={`/appointment/${doc?._id.toLowerCase()}`}
                key={index}
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
                    src={doc.image}
                    alt="doctor image"
                    priority={index < 4} // Prioritize first 4 images for LCP
                  />
                </motion.div>
                <div className="py-2 px-4 flex flex-col items-start">
                  <p className="text-green-500 flex items-center gap-1">
                    <span className="bg-green-500 rounded-full h-2 w-2"></span> Available
                  </p>
                  <h3 className="text-lg">{doc.name}</h3>
                  <p className="text-sm text-gray-600">{doc.speciality}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* Swiper for smaller screens */}
          <div className="lg:hidden">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{
                clickable: true,
                el: '.custom-swiper-pagination', // Custom pagination container
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={filteredDoctors.length >= 2} // Enable loop only if enough slides
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mySwiper"
            >
              {filteredDoctors.map((doc, index) => (
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
                        src={doc.image}
                        alt="doctor image"
                        priority={index < 3} // Prioritize first 3 images for LCP
                      />
                    </motion.div>
                    <div className="py-2 px-4 flex flex-col items-start">
                      <p className="text-green-500 flex items-center gap-1">
                        <span className="bg-green-500 rounded-full h-2 w-2"></span> Available
                      </p>
                      <h3 className="text-lg">{doc.name}</h3>
                      <p className="text-sm text-gray-600">{doc.speciality}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="custom-swiper-pagination mt-4 text-center"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;