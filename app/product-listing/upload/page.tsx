"use client";

import { useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

export default function ProductUploadPage() {
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideos(Array.from(e.target.files));
    }
  };

  return (
    <DashboardLayout>
    <div className="">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Upload New Product</h2>

        {/* Product Title */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Product Title</label>
          <input
            type="text"
            placeholder="Enter product title"
            className="w-full border border-[#d97706] p-2 rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Description</label>
          <textarea
            placeholder="Enter product description"
            className="w-full border border-[#d97706] p-2 rounded-md focus:ring focus:ring-blue-400"
            rows={4}
          />
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Price ($)</label>
          <input
            type="number"
            placeholder="Enter price"
            className="w-full border border-[#d97706] p-2 rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Specifications */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Specifications</label>
          <textarea
            placeholder="Enter specifications (e.g. color, size, weight)"
            className="w-full border border-[#d97706] p-2 rounded-md focus:ring focus:ring-blue-400"
            rows={3}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full border border-[#d97706] p-2 rounded-md"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((img, idx) => (
              <p
                key={idx}
                className="bg-gray-200 px-3 py-1 rounded-md text-sm"
              >
                {img.name}
              </p>
            ))}
          </div>
        </div>

        {/* Video Upload */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Upload Videos</label>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoUpload}
            className="w-full border border-[#d97706] p-2 rounded-md"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {videos.map((vid, idx) => (
              <p
                key={idx}
                className="bg-gray-200 px-3 py-1 rounded-md text-sm"
              >
                {vid.name}
              </p>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className=" flex items-center justify-center">
        <button className="w-1/3 bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706]  text-white p-3 rounded-md transition">
          Save Product
        </button>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
