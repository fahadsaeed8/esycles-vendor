"use client";

import { useState } from "react";
import { Eye, EyeOff, Layout, Image, Award } from "lucide-react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

export default function ControlVisibility() {
  const [showProfile, setShowProfile] = useState(true);
  const [showBranding, setShowBranding] = useState(true);
  const [showDesign, setShowDesign] = useState(true);
  const [showBadges, setShowBadges] = useState(true);

  return (
    <DashboardLayout>
    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Control Visibility – Mini-Shop Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-300">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Visibility Controls
          </h2>
          <div className="space-y-4">
            {/* Profile Toggle */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-gray-700">
                <Eye className="w-5 h-5 text-green-600" /> Show Profile
              </span>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className={`px-4 py-1 rounded-full text-white transition ${
                  showProfile ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                {showProfile ? "Visible" : "Hidden"}
              </button>
            </div>

            {/* Branding Toggle */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-gray-700">
                <Image className="w-5 h-5 text-blue-600" /> Show Branding
              </span>
              <button
                onClick={() => setShowBranding(!showBranding)}
                className={`px-4 py-1 rounded-full text-white transition ${
                  showBranding ? "bg-blue-600" : "bg-gray-400"
                }`}
              >
                {showBranding ? "Visible" : "Hidden"}
              </button>
            </div>

            {/* Design Toggle */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-gray-700">
                <Layout className="w-5 h-5 text-purple-600" /> Show Design
              </span>
              <button
                onClick={() => setShowDesign(!showDesign)}
                className={`px-4 py-1 rounded-full text-white transition ${
                  showDesign ? "bg-purple-600" : "bg-gray-400"
                }`}
              >
                {showDesign ? "Visible" : "Hidden"}
              </button>
            </div>

            {/* Badges Toggle */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-gray-700">
                <Award className="w-5 h-5 text-yellow-600" /> Show Badges
              </span>
              <button
                onClick={() => setShowBadges(!showBadges)}
                className={`px-4 py-1 rounded-full text-white transition ${
                  showBadges ? "bg-yellow-600" : "bg-gray-400"
                }`}
              >
                {showBadges ? "Visible" : "Hidden"}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-300">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Live Preview – Mini-Shop
          </h2>
          <div className="border border-gray-300 rounded-xl p-6 bg-gray-100 space-y-4">
            {showProfile && (
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-gray-800 font-semibold">Vendor Profile</h3>
                <p className="text-gray-600 text-sm">
                  Basic vendor info will be shown here.
                </p>
              </div>
            )}

            {showBranding && (
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-gray-800 font-semibold">Branding</h3>
                <p className="text-gray-600 text-sm">
                  Logo and banner displayed here.
                </p>
              </div>
            )}

            {showDesign && (
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-gray-800 font-semibold">Design</h3>
                <p className="text-gray-600 text-sm">
                  Custom layout and theme visible here.
                </p>
              </div>
            )}

            {showBadges && (
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-gray-800 font-semibold">Trust Badges</h3>
                <p className="text-gray-600 text-sm">
                  Certifications and achievements shown here.
                </p>
              </div>
            )}

            {!showProfile && !showBranding && !showDesign && !showBadges && (
              <p className="text-center text-gray-500">
                All sections are hidden.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
