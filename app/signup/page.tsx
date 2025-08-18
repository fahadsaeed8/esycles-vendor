"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Sign Up successful:", values);
      window.location.href = "/";
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-transparent bg-clip-text">
          Sign Up to Esycles Vendor
        </h1>
        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`w-full px-4 py-2 border rounded-lg focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:border-[1px] focus:border-green-500 transition-all duration-300 ease-in-out ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full px-4 py-2 border rounded-lg focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:border-[1px] focus:border-green-500 transition-all duration-300 ease-in-out ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full px-4 py-2 border rounded-lg focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:border-[1px] focus:border-green-500 transition-all duration-300 ease-in-out ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={`w-full px-4 py-2 border rounded-lg focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:border-[1px] focus:border-green-500 transition-all duration-300 ease-in-out ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 cursor-pointer rounded-lg bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/logout" className="font-medium bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-transparent bg-clip-text">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
