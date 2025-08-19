"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Switch } from "@headlessui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Camera } from "lucide-react";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { useUser } from "../../components/profileContext/profile-content";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function VendorSettings() {
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [notificationsSMS, setNotificationsSMS] = useState(false);
  const [notificationsPush, setNotificationsPush] = useState(true);
  const { profileImage, setProfileImage } = useUser();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      storeName: "",
      currency: "USD",
      storeCategory: "",
      storeDescription: "",
      businessName: "",
      taxId: "",
      businessAddress: "",
      bankName: "",
      accountNumber: "",
      preferredPaymentMethod: "Bank Transfer",
      defaultShippingRate: "",
      freeShippingOver: "",
      shippingZones: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      storeName: Yup.string().required("Store Name is required"),
      storeCategory: Yup.string().required("Store Category is required"),
      storeDescription: Yup.string().required("Store Description is required"),
      businessName: Yup.string().required("Business Name is required"),
      taxId: Yup.string().required("Tax ID is required"),
      businessAddress: Yup.string().required("Business Address is required"),
      bankName: Yup.string().required("Bank Name is required"),
      accountNumber: Yup.string().required("Account Number is required"),
      defaultShippingRate: Yup.number()
        .typeError("Must be a number")
        .required("Required"),
      freeShippingOver: Yup.number()
        .typeError("Must be a number")
        .required("Required"),
      shippingZones: Yup.string().required("Shipping Zones are required"),
      currentPassword: Yup.string().required("Current Password is required"),
      newPassword: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("New Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Values:", {
        ...values,
        notificationsEmail,
        notificationsSMS,
        notificationsPush,
        profileImage,
      });
    },
  });

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className=" bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="border-b px-6 py-5 bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
            <h1 className="text-2xl font-bold text-white">Vendor Settings</h1>
            <p className="text-orange-100 text-sm">
              Manage your vendor account, store, and preferences
            </p>
          </div>

          {/* Form */}
          <form
            className=" p-4 md:p-6 space-y-8"
            onSubmit={formik.handleSubmit}
          >
            {/* Profile Picture */}
            <div className="flex flex-col items-center justify-start">
              <div className="relative">
                <img
                  src={profileImage || "/icons/profile-avatar.jpg"}
                  alt="Profile Preview"
                  className="h-28 w-28 rounded-full object-cover border border-gray-300 shadow"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 bg-orange-500 p-2 rounded-full text-white shadow hover:bg-orange-600 transition"
                >
                  <Camera size={16} className=" cursor-pointer" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Click the camera to upload image
              </p>
            </div>

            {/* Profile Settings */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800">
                Profile Settings
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Full Name"
                  name="fullName"
                  placeholder="John Doe"
                  formik={formik}
                />
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="vendor@esycles.com"
                  formik={formik}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <PhoneInput
                    country={"pk"}
                    value={formik.values.phone}
                    onChange={(value) => formik.setFieldValue("phone", value)}
                    enableSearch={true}
                    containerClass="w-full"
                    inputClass="!w-full !rounded-lg !border !border-gray-300 !px-3 !py-5 shadow-sm h-full !pl-12 !outline-none focus:!border-orange-500 focus:!ring focus:!ring-orange-300 transition-all duration-200"
                    buttonClass="!border-none !bg-transparent !pl-3 !pr-1 !rounded-l-lg"
                    dropdownClass="!bg-white !shadow-lg !border !border-gray-200"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Store Settings */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800">
                Store Settings
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Store Name"
                  name="storeName"
                  placeholder="Esycles Store"
                  formik={formik}
                />
                <SelectField
                  label="Currency"
                  name="currency"
                  options={["USD", "PKR", "EUR"]}
                  formik={formik}
                />
                <InputField
                  label="Store Category"
                  name="storeCategory"
                  placeholder="Bicycles & Accessories"
                  formik={formik}
                />
                <TextAreaField
                  label="Store Description"
                  name="storeDescription"
                  placeholder="Write a short description about your store..."
                  formik={formik}
                />
              </div>
            </section>

            {/* Business Info */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800">
                Business Information
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Business Name"
                  name="businessName"
                  placeholder="Esycles Pvt Ltd"
                  formik={formik}
                />
                <InputField
                  label="Tax ID"
                  name="taxId"
                  placeholder="123-456-789"
                  formik={formik}
                />
                <InputField
                  label="Business Address"
                  name="businessAddress"
                  placeholder="123 Street, City, Country"
                  formik={formik}
                />
              </div>
            </section>

            {/* Payment Settings */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800">
                Payment Settings
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Bank Name"
                  name="bankName"
                  placeholder="Habib Bank Ltd"
                  formik={formik}
                />
                <InputField
                  label="Account Number"
                  name="accountNumber"
                  placeholder="PK00-HBL-1234-5678"
                  formik={formik}
                />
                <SelectField
                  label="Preferred Payment Method"
                  name="preferredPaymentMethod"
                  options={["Bank Transfer", "Easypaisa", "JazzCash", "PayPal"]}
                  formik={formik}
                />
              </div>
            </section>

            {/* Shipping Settings */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800">
                Shipping Settings
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Default Shipping Rate"
                  name="defaultShippingRate"
                  placeholder="5.00"
                  formik={formik}
                />
                <InputField
                  label="Free Shipping Over"
                  name="freeShippingOver"
                  placeholder="50.00"
                  formik={formik}
                />
                <InputField
                  label="Shipping Zones"
                  name="shippingZones"
                  placeholder="Domestic, International"
                  formik={formik}
                />
              </div>
            </section>

            {/* Notifications */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800">
                Notification Preferences
              </h2>
              <ToggleField
                label="Email Notifications"
                enabled={notificationsEmail}
                setEnabled={setNotificationsEmail}
              />
              <ToggleField
                label="SMS Notifications"
                enabled={notificationsSMS}
                setEnabled={setNotificationsSMS}
              />
              <ToggleField
                label="Push Notifications"
                enabled={notificationsPush}
                setEnabled={setNotificationsPush}
              />
            </section>

            {/* Security */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800">Security</h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  formik={formik}
                />
                <InputField
                  label="New Password"
                  name="newPassword"
                  type="password"
                  placeholder="••••••••"
                  formik={formik}
                />
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  formik={formik}
                />
              </div>
            </section>

            {/* Save Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2 cursor-pointer bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white rounded-lg shadow hover:bg-orange-600 transition"
                type="submit"
              >
                Save Changes
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

/* ======== REUSABLE COMPONENTS ======== */
function InputField({
  label,
  name,
  type = "text",
  placeholder,
  formik,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  formik: any;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <motion.input
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        whileFocus={{
          scale: 1.02,
          boxShadow: "0 0 0 4px rgba(249,115,22,0.2)",
        }}
        whileHover={{ scale: 1.01 }}
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-orange-500 focus:ring focus:ring-orange-300 transition-all duration-200"
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-xs text-red-500 mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  formik,
}: {
  label: string;
  name: string;
  options: string[];
  formik: any;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <motion.select
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        whileFocus={{
          scale: 1.02,
          boxShadow: "0 0 0 4px rgba(249,115,22,0.2)",
        }}
        whileHover={{ scale: 1.01 }}
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-orange-500 focus:ring focus:ring-orange-300 transition-all duration-200"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </motion.select>
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-xs text-red-500 mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
  formik,
}: {
  label: string;
  name: string;
  placeholder?: string;
  formik: any;
}) {
  return (
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <motion.textarea
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        whileFocus={{
          scale: 1.02,
          boxShadow: "0 0 0 4px rgba(249,115,22,0.2)",
        }}
        whileHover={{ scale: 1.01 }}
        placeholder={placeholder}
        rows={3}
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-orange-500 focus:ring focus:ring-orange-300 transition-all duration-200"
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-xs text-red-500 mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
}

function ToggleField({
  label,
  enabled,
  setEnabled,
}: {
  label: string;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl mt-3">
      <span className="text-sm text-gray-700">{label}</span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? "bg-orange-500" : "bg-gray-300"
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  );
}
