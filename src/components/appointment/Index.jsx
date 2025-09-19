"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { assets, doctors } from "../../../public/images/assets";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { A11y, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/a11y";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addAppointment, removeAppointment } from "@/store/appointmentsSlice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Index = ({ id }) => {
  const user = useSelector((state) => state?.user?.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const currentDate = new Date();
  const currentDayValue = currentDate
    .toLocaleDateString("en-US", { weekday: "short" })
    .slice(0, 3)
    .toLowerCase();
  const [activeTab, setActiveTab] = useState(currentDayValue);

  const currentDoctor = doctors.find(
    (doc) => doc?._id.toLowerCase() === id.toLowerCase()
  );

  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayOfMonth = date.getDate();
    days.push({ dayOfWeek, dayOfMonth, date });
  }

  const handleAddAppointment = (appointmentData) => {
    dispatch(addAppointment(appointmentData));
    setTimeout(() => {
      router.push("/my-appointments");
    }, 4000);
  };

  const handleRemoveAppointment = (appointmentData) => {
    dispatch(removeAppointment(appointmentData?.id));
  };

  const generateTimeSlots = (date) => {
    const slots = [];
    let startTime = new Date(date);
    startTime.setHours(10, 0, 0, 0);
    const endTime = new Date(date);
    endTime.setHours(19, 0, 0, 0);

    if (date.toDateString() === currentDate.toDateString()) {
      const currentTime = new Date();
      const minutes = currentTime.getMinutes();
      if (minutes > 0) {
        currentTime.setMinutes(minutes < 30 ? 30 : 60);
        currentTime.setSeconds(0, 0);
      }
      startTime = new Date(Math.max(startTime, currentTime));
    }

    while (startTime <= endTime) {
      const timeString = startTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      slots.push(timeString);
      startTime.setMinutes(startTime.getMinutes() + 30);
    }
    return slots;
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot === selectedSlot ? null : slot);
  };

  useEffect(() => {
    setSelectedSlot(null);
  }, [activeTab]);

  useEffect(() => {
    console.log("Selected Slot:", selectedSlot);
  }, [selectedSlot]);

  const generateUniqueId = () => {
    return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
  };
  const getFullDateFromActiveTab = () => {
    const selectedDay = days.find(
      (day) => day.dayOfWeek.slice(0, 3).toLowerCase() === activeTab
    );
    if (selectedDay) {
      return selectedDay.date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "Unknown Date";
  };

  const bookAppointment = () => {
    if (!selectedSlot) {
      toast("Please select a time slot!");
      return;
    }
    if (user == null) {
      toast("Please login to book appointment!");
      return;
    }
    const uniqueId = generateUniqueId();
    const fullDate = getFullDateFromActiveTab();
    const appointmentData = {
      id: currentDoctor?._id,
      doctorName: currentDoctor?.name,
      date: fullDate,
      time: selectedSlot,
      unique_id: uniqueId,
    };

    handleAddAppointment(appointmentData);

    toast(
      `Appointment has been successfully scheduled with ${currentDoctor?.name}`,
      {
        description: `On ${fullDate} at ${selectedSlot}`,
        action: {
          label: "Undo",
          onClick: () => handleRemoveAppointment(appointmentData?.unique_id),
        },
      }
    );
  };

  return (
    <section className="py-5 forAppointmentDoctors">
      {doctors
        .filter((doc) => doc?._id.toLowerCase() === id.toLowerCase())
        .map((doc, index) => (
          <div key={index} className="flex lg:flex-row flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/4 text-center"
            >
              <Image
                style={{
                  backgroundImage: `radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(36, 36, 36,0.04) 0%, rgba(36, 36, 36,0.04) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),linear-gradient(90deg, rgb(34, 222, 237),rgb(135, 89, 215))`,
                }}
                className="w-full md:max-w-72 rounded-lg"
                src={doc?.image}
                alt="doctor"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="w-full md:w-full lg:w-3/4 lg:mt-0 mt-[-100px] bg-white flex flex-col gap-3"
            >
              <div className="border border-[#ADADAD] p-8 flex flex-col gap-3 rounded-xl">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-bold">{doc?.name}</h1>
                  <Image
                    className="w-10 rounded-lg"
                    src={assets?.verified_icon}
                    alt="doctor"
                  />
                </div>
                <div className="flex gap-4">
                  <h4 className="text-lg font-medium">
                    {doc?.degree + " - " + doc?.speciality}
                  </h4>
                  <span className="border text-[#333131] border-[#adadad] rounded-full px-3 text-sm py-1">
                    Experience: {doc?.experience}
                  </span>
                </div>
                <div className="flex gap-1">
                  <span>About</span>
                  <Image
                    className="w-4 rounded-lg"
                    src={assets?.info_icon}
                    alt="doctor"
                  />
                </div>
                <p className="text-gray-600">{doc?.about}</p>{" "}
                <div className="flex gap-1 items-center">
                  <h6>Appointment fee:</h6>
                  <Image
                    className="w-8 rounded-lg"
                    src={assets?.dollar_icon}
                    alt="doctor"
                  />
                  <h5 className="text-2xl text-[#5f6fff] font-extrabold">
                    {doc?.fees}
                  </h5>
                </div>
              </div>
            </motion.div>
          </div>
        ))}

      <Tabs
        defaultValue={currentDayValue}
        onValueChange={setActiveTab}
        className="lg:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]"
      >
        <TabsList className="w-full overflow-hidden">
          <div className="w-full max-w-full">
            <Swiper
              modules={[A11y, FreeMode]}
              freeMode={{
                momentum: true,
                momentumRatio: 1,
                momentumVelocityRatio: 1,
              }}
              grabCursor={true}
              spaceBetween={8}
              slidesPerView={3}
              breakpoints={{
                360: { slidesPerView: 4.4 },
                480: { slidesPerView: 5.5 },
                768: { slidesPerView: 6.5 },
                1024: { slidesPerView: 7 },
              }}
              preventClicks={false}
              preventClicksPropagation={false}
              threshold={10}
              touchStartPreventDefault={false}
              className="mt-4"
            >
              {days.map((day, index) => {
                const dayValue = day.dayOfWeek.slice(0, 3).toLowerCase();
                return (
                  <SwiperSlide
                    key={index}
                    className="!w-auto flex items-center justify-center"
                  >
                    <TabsTrigger
                      className="uppercase flex flex-col text-xl p-2 w-full h-full items-center justify-center cursor-pointer hover:bg-gray-100 data-[state=active]:bg-gray-200 data-[state=active]:text-black"
                      value={dayValue}
                    >
                      <span>{day.dayOfWeek}</span>
                      <span>{day.dayOfMonth}</span>
                    </TabsTrigger>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </TabsList>
        {days.map((day, index) => {
          const dayValue = day.dayOfWeek.slice(0, 3).toLowerCase();
          const timeSlots = generateTimeSlots(day.date);

          return (
            <TabsContent className="mt-4" key={index} value={dayValue}>
              <Swiper
                modules={[A11y, FreeMode]}
                freeMode
                grabCursor={true}
                spaceBetween={10}
                className="cursor-grab md:mt-4"
                breakpoints={{
                  360: { slidesPerView: 3.5 },
                  480: { slidesPerView: 4.5 },
                  768: { slidesPerView: 5.5 },
                  1024: { slidesPerView: 6.5 },
                  1280: { slidesPerView: 7.5 },
                  1536: { slidesPerView: 8.5 },
                }}
              >
                {timeSlots.length > 0 ? (
                  timeSlots.map((slot, index) => (
                    <SwiperSlide
                      key={index}
                      className={`border p-2 text-center rounded-full text-nowrap cursor-pointer ${
                        selectedSlot === slot
                          ? "bg-[#5f6fff] text-white"
                          : "bg-gray-100"
                      }`}
                      onClick={() => handleSlotClick(slot)}
                    >
                      {slot}
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide className="text-nowrap">
                    Sorry, No Slots Available for this day!
                  </SwiperSlide>
                )}
              </Swiper>
              <button
                variant="outline"
                onClick={bookAppointment}
                className="text-white my-5 py-3 px-4 bg-primary hover:bg-indigo-600 rounded-full text-xl font-semibold"
              >
                Book Appointment
              </button>
            </TabsContent>
          );
        })}
      </Tabs>
      <h4 className="text-xl font-bold">Related Doctors</h4>
      <div className="lg:grid hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {doctors
          .filter((doc) => {
            const selectedDoctor = doctors.find(
              (d) => d._id.toLowerCase() === id.toLowerCase()
            );
            return (
              selectedDoctor &&
              doc.speciality === selectedDoctor.speciality &&
              doc._id.toLowerCase() !== id.toLowerCase()
            );
          })
          .map((doc, index) => (
            <Link
              href={`/appointment/${doc._id.toLowerCase()}`}
              key={index}
              className="flex flex-col gap-0 border rounded-lg border-teal-700 hover:translate-y-[-10px] transition-all duration-500 hover:cursor-pointer"
            >
              <div className="bg-sky-100 rounded-lg rounded-b-none">
                <Image className="w-full" src={doc.image} alt="doctor image" />
              </div>
              <div className="py-2 px-4 flex flex-col items-start">
                <p className="text-green-500 flex items-center gap-1">
                  <span className="bg-green-500 rounded-full h-2 w-2"></span>{" "}
                  Available
                </p>
                <h3 className="text-lg">{doc.name}</h3>
                <p className="text-sm text-gray-600">{doc.speciality}</p>
              </div>
            </Link>
          ))}
      </div>
      <div className="lg:hidden mt-3">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
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
          {doctors
            .filter((doc) => {
              const selectedDoctor = doctors.find(
                (d) => d._id.toLowerCase() === id.toLowerCase()
              );
              return (
                selectedDoctor &&
                doc.speciality === selectedDoctor.speciality &&
                doc._id.toLowerCase() !== id.toLowerCase()
              );
            })
            .map((doc, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={`/appointment/${doc._id.toLowerCase()}`}
                  className="flex flex-col gap-0 border rounded-lg border-teal-700 hover:translate-y-[-10px] transition-all duration-500 hover:cursor-pointer"
                >
                  <div className="bg-sky-100 rounded-lg rounded-b-none">
                    <Image
                      className="w-full"
                      src={doc.image}
                      alt="doctor image"
                      priority={index<3}
                    />
                  </div>
                  <div className="py-2 px-4 flex flex-col items-start">
                    <p className="text-green-500 flex items-center gap-1">
                      <span className="bg-green-500 rounded-full h-2 w-2"></span>{" "}
                      Available
                    </p>
                    <h3 className="text-lg">{doc.name}</h3>
                    <p className="text-sm text-gray-600">{doc.speciality}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Index;