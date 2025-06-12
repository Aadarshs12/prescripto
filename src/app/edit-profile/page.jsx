"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Save } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

// Redux action to set user
const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  required,
  isEmail = false,
  formValues,
  isEditing,
  register,
  errors,
}) => (
  <>
    <div>{label}:</div>
    <div className="col-span-2">
      {isEmail ? (
        <span className="text-[#5f6fff]">{formValues.email}</span>
      ) : isEditing && name === "gender" ? (
        <div>
          <select
            {...register(name, {
              required: required && `${label} is required`,
            })}
            className={`w-full border rounded px-2 py-1 ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-teal-500`}
            aria-label={label}
            aria-invalid={errors[name] ? "true" : "false"}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors[name] && (
            <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
          )}
        </div>
      ) : isEditing ? (
        <div>
          <input
            type={type}
            {...register(name, {
              required: required && `${label} is required`,
              ...(name === "phone" && {
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone must be 10 digits",
                },
              }),
            })}
            className={`w-full border rounded px-2 py-1 ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-teal-500`}
            placeholder={placeholder}
            aria-label={label}
            aria-invalid={errors[name] ? "true" : "false"}
            disabled={false}
          />
          {errors[name] && (
            <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
          )}
        </div>
      ) : (
        <span>{formValues[name]}</span>
      )}
    </div>
  </>
);

const Page = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email || "",
      phone: "0000000000",
      addressLine1: "10",
      addressLine2: "12",
      gender: "Male",
      birthday: "2003-08-12",
    },
  });

  const formValues = watch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(
          "Auth state changed, UID:",
          currentUser.uid,
          "at",
          new Date().toLocaleString()
        );
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
          })
        );
      } else {
        console.log(
          "Auth state changed: User signed out at",
          new Date().toLocaleString()
        );
        dispatch(setUser(null));
        setError("Please sign in to view your profile");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (user?.email !== formValues.email) {
      reset({
        email: user?.email || "",
        phone: formValues.phone,
        addressLine1: formValues.addressLine1,
        addressLine2: formValues.addressLine2,
        gender: formValues.gender,
        birthday: formValues.birthday,
      });
    }
  }, [user?.email, reset, formValues.email]);

  useEffect(() => {
    if (!user?.uid) {
      setError("Please sign in to view your profile");
      console.log(
        "No user UID, skipping Firestore fetch at",
        new Date().toLocaleString()
      );
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = await auth.currentUser.getIdToken(true);
        console.log(
          "Refreshed token successfully for UID:",
          user.uid,
          "at",
          new Date().toLocaleString()
        );
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
        console.log(
          "Firestore response for UID",
          user.uid,
          ":",
          docSnap.exists(),
          docSnap.data(),
          "at",
          new Date().toLocaleString()
        );
        if (docSnap.exists()) {
          const data = docSnap.data();
          reset({
            email: user.email || "",
            phone: data.phone || "0000000000",
            addressLine1: data.addressLine1 || "10",
            addressLine2: data.addressLine2 || "12",
            gender: data.gender || "Male",
            birthday: data.birthday || "2003-08-12",
          });
        }
      } catch (err) {
        console.error(
          "Firestore error for UID",
          user.uid,
          ":",
          err.code,
          err.message,
          "at",
          new Date().toLocaleString()
        );
        setError(
          err.code === "permission-denied"
            ? "You don't have permission to access this profile. Please sign in with the correct account."
            : "Failed to load profile data: " + err.message
        );
      }
    };

    fetchUserData();
  }, [user?.uid, reset]);

  const toggleEdit = () => {
    console.log(
      "Toggling edit mode. Current isEditing:",
      isEditing,
      "at",
      new Date().toLocaleString()
    );
    setIsEditing((prev) => !prev);
  };

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setError(
        "You have been signed out. Please sign in with the correct account."
      );
    } catch (err) {
      console.error(
        "Sign out failed:",
        err.message,
        "at",
        new Date().toLocaleString()
      );
      setError("Failed to sign out: " + err.message);
    }
  };

  const onSubmit = async (data) => {
    console.log(
      "Form submitted with data:",
      data,
      "at",
      new Date().toLocaleString()
    );
    
    if (!user?.uid) {
      setError("Please sign in to save your profile");
      toast("Information Successfully Saved", {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
      console.log(
        "No user UID, skipping Firestore save at",
        new Date().toLocaleString()

      );
      
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    try {
      const updateData = {
        email: user.email,
        phone: data.phone,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        gender: data.gender,
        birthday: data.birthday,
      };

      console.log(
        "Saving profile data to Firestore:",
        updateData,
        "at",
        new Date().toLocaleString()
      );
      await setDoc(userDocRef, updateData, { merge: true });
      console.log(
        "Profile saved to Firestore at users/",
        user.uid,
        "at",
        new Date().toLocaleString()
      );
      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error(
        "Firestore error for UID",
        user.uid,
        ":",
        err.code,
        err.message,
        "at",
        new Date().toLocaleString()
      );
      setError("Failed to save profile: " + err.message);
    }
  };

  return (
    <div className="flex flex-col lg:w-1/2 w-full gap-6 p-4">
      <h1 className="text-3xl font-semibold">{user?.displayName || "User"}</h1>
      <hr className="border-gray-400" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <h6 className="text-teal-700 text-lg underline">CONTACT INFORMATION</h6>
        <div className="grid grid-cols-3 gap-5 mt-5">
          <FormField
            label="Email id"
            name="email"
            type="email"
            required
            isEmail={true}
            formValues={formValues}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <FormField
            label="Phone"
            name="phone"
            type="tel"
            required
            formValues={formValues}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <div>Address:</div>
          <div className="col-span-2 flex flex-col gap-1">
            {isEditing ? (
              <>
                <input
                  {...register("addressLine1", {
                    required: "Address Line 1 is required",
                  })}
                  className={`w-full border rounded px-2 py-1 ${
                    errors.addressLine1 ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="Address Line 1"
                  aria-label="Address Line 1"
                  aria-invalid={errors.addressLine1 ? "true" : "false"}
                />
                {errors.addressLine1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.addressLine1.message}
                  </p>
                )}
                <input
                  {...register("addressLine2")}
                  className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Address Line 2"
                  aria-label="Address Line 2"
                />
              </>
            ) : (
              <>
                <span>{formValues.addressLine1}</span>
                <span>{formValues.addressLine2}</span>
              </>
            )}
          </div>
        </div>

        <h6 className="text-teal-700 text-lg underline mt-4">
          BASIC INFORMATION
        </h6>
        <div className="grid grid-cols-3 gap-5 mt-5">
          <FormField
            label="Gender"
            name="gender"
            required
            formValues={formValues}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <FormField
            label="Birthday"
            name="birthday"
            type="date"
            required
            formValues={formValues}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            console.log(
              "Button clicked. isEditing:",
              isEditing,
              "at",
              new Date().toLocaleString()
            );
            if (isEditing) {
              handleSubmit(onSubmit)();
            } else {
              toggleEdit();
            }
          }}
          className="flex gap-2 border text-teal-700 border-teal-700 w-fit py-2 px-3 mt-5 rounded-full"
          aria-label={isEditing ? "Save information" : "Edit information"}
        >
          {isEditing ? (
            <Save className="text-xs" />
          ) : (
            <Pencil className="text-xs" />
          )}
          {isEditing ? "Save information" : "Edit information"}
        </button>
      </form>
    </div>
  );
};

export default Page;