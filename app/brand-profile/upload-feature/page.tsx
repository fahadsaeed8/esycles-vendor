"use client";

import { useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

export default function BrandProfileUpload() {
  const [logo, setLogo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLogo(file);
    if (file) setPreviewLogo(URL.createObjectURL(file));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBanner(file);
    if (file) setPreviewBanner(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Brand Profile", {
      storeName,
      description,
      logo,
      banner,
    });
    alert("Profile details saved (frontend only)!");
  };

  return (
    <DashboardLayout>
    <div className="flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl shadow-lg rounded-lg p-6">
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
          Brand & Profile Upload
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Upload Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
            />
            {previewLogo && (
              <div className="mt-3">
                <img
                  src={previewLogo}
                  alt="Logo Preview"
                  className="h-20 w-20 object-contain border rounded"
                />
              </div>
            )}
          </div>

          {/* Banner Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Upload Banner
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
            />
            {previewBanner && (
              <div className="mt-3">
                <img
                  src={previewBanner}
                  alt="Banner Preview"
                  className="h-32 w-full object-cover border rounded"
                />
              </div>
            )}
          </div>

          {/* Store Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Store Name
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Enter your store name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Store Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Store Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write about your store..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
    </DashboardLayout>
  );
}
