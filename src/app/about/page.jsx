import React from "react";
import { assets } from "../../../public/images/assets";
import Image from "next/image";
const page = () => {
  return (
    <section>
      <div className="text-center">
        <h1 className="text-3xl">
          About <span className="font-bold text-[#5f6fff]">Us</span>
        </h1>
      </div>
      <div className="flex gap-6 flex-col lg:flex-row items-center py-4 md:py-7">
        <div className="md:w-2/6  w-100">
          <Image src={assets?.about_image} alt="aboutImage" />
        </div>
        <div className="md:w-4/6 w-100">
          <div className="flex flex-col gap-5 text-gray-600">
            <p>
              Welcome to Prescripto, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At Prescripto, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </p>
            <p>
              Prescripto is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you're booking your first appointment or
              managing ongoing care, Prescripto is here to support you every
              step of the way.
            </p>
            <h3 className="text-xl font-bold text-black">Our Vision</h3>
            <p>
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>
      <div className="text-xl my-4"><p>WHY  <span className="text-gray-700 font-semibold">CHOOSE US</span></p></div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE: </b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
