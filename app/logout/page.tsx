"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      // ✅ Navigate only if inputs are valid
      if (values.email && values.password) {
        router.push("/");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-transparent bg-clip-text">
          Sign In to Esycles Vendor
        </h2>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full px-4 py-2 border rounded-xl focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:border-[1px] focus:border-green-500 transition-all duration-300 ease-in-out ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#f59e0b]"
              }`}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            ) : null}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full px-4 py-2 border rounded-xl focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:border-[1px] focus:border-green-500 transition-all duration-300 ease-in-out ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#f59e0b]"
              }`}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full cursor-pointer py-2 rounded-xl bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-transparent bg-clip-text font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
