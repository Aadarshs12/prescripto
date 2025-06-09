"use client";
import React, { useState } from "react";
import { doctors } from "../../../public/images/assets";
import { assets } from "../../../public/images/assets";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeAppointment } from "@/store/appointmentsSlice";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [onlineMethod, setOnlineMethod] = useState(false);
  const dispatch = useDispatch();
  const appointments = useSelector(
    (state) => state?.appointments?.appointments
  );
  console.log(appointments, "appointments");

  const handleCancelAppointment = (appointment) => {
    dispatch(removeAppointment(appointment.unique_id));
  };

  const handleButtonPayment = () => {
    setOnlineMethod(true);
  };

  const handleOnlinePayment = () => {
    toast("Online payments are currently not available.", {
      description: "This website is designed for personal learning purposes.",
      action: {
        label: "Close",
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <section>
      <div>
        <h1 className="font-semibold text-xl mb-3">My Appointments</h1>
        <div>
          {appointments && appointments.length >= 1 ? (
            appointments?.map((appointment, index) => {
              const doctor = doctors?.find(
                (doc) => doc?._id === appointment.id
              );
              if (!doctor) return null;
              return (
                <div
                  className="flex border-t border-gray-300 py-3 my-3 gap-5 md:items-center md:flex-row flex-col md:justify-content-between"
                  key={index}
                >
                  <div className="w-full lg:w-5/6 lg:items-center flex lg:flex-row flex-col gap-5">
                    <div className="w-full lg:w-1/5 bg-sky-100 rounded-lg">
                      <Image
                        className="w-full"
                        src={doctor?.image}
                        alt={doctor?.name}
                      />
                    </div>
                    <div className="w-full lg:w-4/5 max-w-96">
                      <h4 className="text-lg font-semibold">{doctor?.name}</h4>
                      <p className="text-gray-600 text-sm">
                        {doctor?.speciality}
                      </p>
                      <p className="text-sm font-semibold">Address:</p>
                      <p className="text-gray-600 text-sm">
                        {doctor?.address?.line1}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {doctor?.address?.line2}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="text-black font-semibold">
                          Date & Time:
                        </span>{" "}
                        {appointment.date} | {appointment.time}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/6 flex flex-col gap-1 lg:gap-4">
                    {onlineMethod && (
                      <button
                        onClick={handleOnlinePayment}
                        className="w-full border border-gray-300 rounded-md flex justify-center p-2"
                      >
                        <Image
                          alt="stripeLogo"
                          className="w-fit h-5"
                          src={assets?.stripe_logo}
                        ></Image>
                      </button>
                    )}

                    {onlineMethod && (
                      <button
                        onClick={handleOnlinePayment}
                        className="w-full border border-gray-300 rounded-md flex justify-center p-2"
                      >
                        <Image
                          alt="razorpayLogo"
                          className="w-fit h-5"
                          src={assets?.razorpay_logo}
                        ></Image>
                      </button>
                    )}
                    {!onlineMethod && (
                      <button
                        onClick={handleButtonPayment}
                        className="text-sm border-green-400 text-green-400 border rounded-md px-3 py-2 hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white"
                      >
                        Pay Online
                      </button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-sm border-red-400 text-red-400 border rounded-md px-3 py-2 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white">
                          Cancel Appointment
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-[#5f6fff]">
                            Are you sure you want to cancel your appointment?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be reversed, and your appointment
                            details will be permanently removed from our system.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            No, I want to go back
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="text-white bg-primary hover:bg-indigo-600"
                            onClick={() => handleCancelAppointment(appointment)}
                          >
                            Yes, Cancel it
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="border-t border-gray-300 py-3 my-5 text-xl">
              <div className="flex justify-center items-center">
                <Image
                  alt="unfortunately Image"
                  className="lg:w-1/2 w-full"
                  src={assets?.unfortunately}
                />
              </div>
              <h4 className="text-center font-semibold text-[#5f6fff]">
                Sorry, There are no appointments booked at the moment.
              </h4>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Index;
