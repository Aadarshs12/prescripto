"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [existingUser, setExistingUser] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 2.0,
  };

  const handleRegister = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data?.fullname,
      });

      toast(
        `${data?.fullname}, your account has been created successfully! 🎉`,
        {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        }
      );
      setTimeout(() => {
        setExistingUser(true);
      }, 4000);
      reset();
      return user;
    } catch (error) {
      console.error("Signup error:", error.code, error.message);
      toast(`${error.message}`, {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
      throw error;
    }
  };

  const handleLogin = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      const user = userCredential.user;
      const displayName = user.displayName.toUpperCase() || "User";
      toast(`${displayName}, you successfully logged in to your account! 🎉`, {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });

      reset();
      setTimeout(() => {
        router.push("/");
      }, 4000);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
      };
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      toast(`${error.message}`, {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
      throw error; // Let the caller handle the error
    }
  };

  const handleExistingUser = () => {
    setExistingUser(!existingUser);
  };

  const gradientStyle = {
    backgroundImage: `radial-gradient(circle at 11% 32%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 5%,transparent 5%, transparent 95%),radial-gradient(circle at 89% 30%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 5%,transparent 5%, transparent 95%),radial-gradient(circle at 76% 90%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 6%,transparent 6%, transparent 94%),radial-gradient(circle at 83% 14%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 6%,transparent 6%, transparent 94%),radial-gradient(circle at 62% 81%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 6%,transparent 6%, transparent 94%),radial-gradient(circle at 34% 3%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 6%,transparent 6%, transparent 94%),radial-gradient(circle at 19% 1%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 4%,transparent 4%, transparent 96%),radial-gradient(circle at 48% 14%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 4%,transparent 4%, transparent 96%),radial-gradient(circle at 54% 23%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 4%,transparent 4%, transparent 96%),radial-gradient(circle at 10% 37%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 4%,transparent 4%, transparent 96%),linear-gradient(90deg, rgb(54, 234, 239),rgb(107, 10, 201))`,
  };
  return (
    <section className="py-10 rounded-md" style={{ ...gradientStyle }}>
      {existingUser === false ? (
        <motion.form
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          onSubmit={handleSubmit(handleRegister)}
          className="flex justify-center"
        >
          <div className="w-full md:w-2/3 lg:w-5/12 text-[#5e5e5e] bg-white shadow-xl p-8 rounded-xl">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl text-indigo-500 font-bold text-center">
                Create Account
              </h3>
              <p className="text-lg">Please sign up to book appointment</p>
              <div>
                <label>Full Name:</label>
                <input
                  {...register("fullname", { required: "Name is required" })}
                  className="border border-gray-600 focus-visible:border-indigo-500 p-2 w-full rounded-md"
                />
                {errors.fullname && (
                  <p className="text-red-500">{errors.fullname.message}</p>
                )}
              </div>
              <div>
                <label>Email:</label>
                <input
                  {...register("email", { required: "Email is required" })}
                  className="border border-gray-600 p-2 w-full rounded-md"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label>Password:</label>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="border border-gray-600 p-2 w-full rounded-md"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="mt-2">
                <button
                  className="bg-primary hover:bg-indigo-600 text-white rounded-md p-2 w-full"
                  type="submit"
                >
                  Create Account
                </button>
              </div>
              <div>
                <span>
                  Already have an account?{" "}
                  <span
                    onClick={handleExistingUser}
                    className="text-indigo-500 hover:cursor-pointer hover:underline"
                  >
                    Login here
                  </span>
                </span>
              </div>
            </div>
          </div>
        </motion.form>
      ) : (
        <motion.form
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          onSubmit={handleSubmit(handleLogin)}
          className="flex justify-center"
        >
          <div className="w-full md:w-2/3 lg:w-5/12 text-[#5e5e5e] bg-white shadow-xl p-8 rounded-xl">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl text-indigo-500 font-bold text-center">
                Login Account
              </h3>
              <p className="text-lg">Please sign in to book appointment</p>
              <div>
                <label>Email:</label>
                <input
                  {...register("email", { required: "Email is required" })}
                  className="border border-gray-600 p-2 w-full rounded-md"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label>Password:</label>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="border border-gray-600 p-2 w-full rounded-md"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="mt-2">
                <button
                  className="bg-primary hover:bg-indigo-600 text-white rounded-md p-2 w-full"
                  type="submit"
                >
                  Login Account
                </button>
              </div>
              <div>
                <span>
                  Don't have an account?{" "}
                  <span
                    onClick={handleExistingUser}
                    className="text-indigo-500 hover:cursor-pointer hover:underline"
                  >
                    Create here
                  </span>
                </span>
              </div>
            </div>
          </div>
        </motion.form>
      )}
    </section>
  );
};

export default Login;
