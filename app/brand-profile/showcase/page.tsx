"use client";

import { useState } from "react";
import { Upload, Award, ShieldCheck } from "lucide-react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

export default function ShowcaseSection() {
  const [certifications, setCertifications] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [badges, setBadges] = useState<File[]>([]);

  const handleAddCertification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("certification") as HTMLInputElement;
    if (input.value.trim()) {
      setCertifications([...certifications, input.value.trim()]);
      input.value = "";
    }
  };

  const handleAddAchievement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("achievement") as HTMLInputElement;
    if (input.value.trim()) {
      setAchievements([...achievements, input.value.trim()]);
      input.value = "";
    }
  };

  const handleBadgeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBadges([...badges, ...Array.from(e.target.files)]);
    }
  };

  return (
    <DashboardLayout>
    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Showcase Section – Certifications, Achievements & Badges
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Certifications */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-300">
          <h2 className="flex items-center text-lg font-semibold mb-4 text-gray-700">
            <Award className="w-5 h-5 text-green-600 mr-2" /> Certifications
          </h2>
          <form onSubmit={handleAddCertification} className="flex gap-2">
            <input
              type="text"
              name="certification"
              placeholder="Enter certification name"
              className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add
            </button>
          </form>
          <ul className="mt-4 space-y-2">
            {certifications.map((cert, i) => (
              <li
                key={i}
                className="p-2 bg-green-50 border border-gray-300 rounded-lg text-gray-700"
              >
                {cert}
              </li>
            ))}
          </ul>
        </div>

        {/* Achievements */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-300">
          <h2 className="flex items-center text-lg font-semibold mb-4 text-gray-700">
            <ShieldCheck className="w-5 h-5 text-blue-600 mr-2" /> Achievements
          </h2>
          <form onSubmit={handleAddAchievement} className="flex gap-2">
            <input
              type="text"
              name="achievement"
              placeholder="Enter achievement"
              className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add
            </button>
          </form>
          <ul className="mt-4 space-y-2">
            {achievements.map((ach, i) => (
              <li
                key={i}
                className="p-2 bg-blue-50 border border-gray-300 rounded-lg text-gray-700"
              >
                {ach}
              </li>
            ))}
          </ul>
        </div>

        {/* Trust Badges */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-300 col-span-1 md:col-span-2">
          <h2 className="flex items-center text-lg font-semibold mb-4 text-gray-700">
            <Upload className="w-5 h-5 text-purple-600 mr-2" /> Upload Trust
            Badges
          </h2>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleBadgeUpload}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          <div className="mt-4 flex flex-wrap gap-4">
            {badges.map((file, i) => (
              <div
                key={i}
                className="w-24 h-24 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Badge ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
