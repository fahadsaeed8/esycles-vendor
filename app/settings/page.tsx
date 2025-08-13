"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@headlessui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DashboardLayout from "../../components/layout/dashboard-layout";

export default function VendorSettings() {
  // Form state
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [notificationsSMS, setNotificationsSMS] = useState(false);
  const [notificationsPush, setNotificationsPush] = useState(true);
  const [phone, setPhone] = useState("");
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
        <form className=" p-4 md:p-6 space-y-8">
          {/* Profile Settings */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800">
              Profile Settings
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <InputField label="Full Name" placeholder="John Doe" />
              <InputField
                label="Email Address"
                type="email"
                placeholder="vendor@esycles.com"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <motion.div
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 0 4px rgba(249,115,22,0.2)",
                  }}
                  whileHover={{ scale: 1.01 }}
                  className="mt-1"
                >
                  <PhoneInput
                    country={"pk"} // default Pakistan
                    value={phone}
                    onChange={(value) => setPhone(value)}
                    enableSearch={true}
                    containerClass="w-full"
                    inputClass="!w-full !rounded-lg !border !border-gray-300 !px-3 !py-5 shadow-sm h-full !pl-12 !outline-none focus:!border-orange-500 focus:!ring focus:!ring-orange-300 transition-all duration-200"
                    buttonClass="!border-none !bg-transparent !pl-3 !pr-1 !rounded-l-lg"
                    dropdownClass="!bg-white !shadow-lg !border !border-gray-200"
                  />
                </motion.div>
              </div>

              <InputField label="Profile Picture" type="file" />
            </div>
          </section>

          {/* Store Settings */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800">
              Store Settings
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <InputField label="Store Name" placeholder="Esycles Store" />
              <SelectField label="Currency" options={["USD", "PKR", "EUR"]} />
              <InputField
                label="Store Category"
                placeholder="Bicycles & Accessories"
              />
              <TextAreaField
                label="Store Description"
                placeholder="Write a short description about your store..."
              />
            </div>
          </section>

          {/* Business Info */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800">
              Business Information
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <InputField label="Business Name" placeholder="Esycles Pvt Ltd" />
              <InputField label="Tax ID" placeholder="123-456-789" />
              <InputField
                label="Business Address"
                placeholder="123 Street, City, Country"
              />
            </div>
          </section>

          {/* Payment Settings */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800">
              Payment Settings
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <InputField label="Bank Name" placeholder="Habib Bank Ltd" />
              <InputField
                label="Account Number"
                placeholder="PK00-HBL-1234-5678"
              />
              <SelectField
                label="Preferred Payment Method"
                options={["Bank Transfer", "Easypaisa", "JazzCash", "PayPal"]}
              />
            </div>
          </section>

          {/* Shipping Settings */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800">
              Shipping Settings
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <InputField label="Default Shipping Rate" placeholder="5.00" />
              <InputField label="Free Shipping Over" placeholder="50.00" />
              <InputField
                label="Shipping Zones"
                placeholder="Domestic, International"
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

          {/* Security Settings */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800">Security</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <InputField
                label="Current Password"
                type="password"
                placeholder="••••••••"
              />
              <InputField
                label="New Password"
                type="password"
                placeholder="••••••••"
              />
              <InputField
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
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
              onClick={(e) => {
                e.preventDefault();
                console.log("Save Changes clicked!");
              }}
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
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <motion.input
        whileFocus={{
          scale: 1.02,
          boxShadow: "0 0 0 4px rgba(249,115,22,0.2)",
        }}
        whileHover={{ scale: 1.01 }}
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-orange-500 focus:ring focus:ring-orange-300 transition-all duration-200"
      />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <motion.select
        whileFocus={{
          scale: 1.02,
          boxShadow: "0 0 0 4px rgba(249,115,22,0.2)",
        }}
        whileHover={{ scale: 1.01 }}
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-orange-500 focus:ring focus:ring-orange-300 transition-all duration-200"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </motion.select>
    </div>
  );
}

function TextAreaField({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <motion.textarea
        whileFocus={{
          scale: 1.02,
          boxShadow: "0 0 0 4px rgba(249,115,22,0.2)",
        }}
        whileHover={{ scale: 1.01 }}
        placeholder={placeholder}
        rows={3}
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-orange-500 focus:ring focus:ring-orange-300 transition-all duration-200"
      />
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
