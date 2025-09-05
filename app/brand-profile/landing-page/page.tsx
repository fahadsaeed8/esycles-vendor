"use client";

import { useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

interface Product {
  id: number;
  name: string;
  price: string;
}

export default function LandingPageManager() {
  const [logo, setLogo] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [storeName, setStoreName] = useState("My Vendor Store");
  const [description, setDescription] = useState("Welcome to my store!");
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [badges, setBadges] = useState<string[]>(["Trusted Seller"]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setLogo(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setBanner(URL.createObjectURL(e.target.files[0]));
    }
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    setProducts([...products, { id: Date.now(), ...newProduct }]);
    setNewProduct({ name: "", price: "" });
  };

  const addBadge = (badge: string) => {
    if (badge && !badges.includes(badge)) {
      setBadges([...badges, badge]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Landing Page Saved (frontend only)");
    console.log({ logo, banner, storeName, description, products, badges });
  };

  return (
    <DashboardLayout>
    <div className=" flex flex-col md:flex-row gap-6">
      {/* Left Panel - Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Manage Landing Page
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Logo Upload */}
          <div>
            <label className="block mb-2 font-medium">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
            />
            {logo && (
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-20 object-contain border border-gray-300 rounded mt-2"
              />
            )}
          </div>

          {/* Banner Upload */}
          <div>
            <label className="block mb-2 font-medium">Upload Banner</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
            />
            {banner && (
              <img
                src={banner}
                alt="Banner"
                className="h-32 w-full object-cover border border-gray-300 rounded mt-2"
              />
            )}
          </div>

          {/* Store Name */}
          <div>
            <label className="block mb-2 font-medium">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Products */}
          <div>
            <label className="block mb-2 font-medium">Add Products</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-28 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={addProduct}
                className="bg-green-600 text-white px-4 rounded-lg"
              >
                Add
              </button>
            </div>
            <ul className="space-y-1 text-sm">
              {products.map((p) => (
                <li
                  key={p.id}
                  className="flex justify-between border border-gray-300 p-2 rounded"
                >
                  <span>{p.name}</span>
                  <span className="text-gray-600">${p.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Badges */}
          <div>
            <label className="block mb-2 font-medium">Trust Badges</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add Badge"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addBadge((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = "";
                  }
                }}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Save Landing Page
          </button>
        </form>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Live Preview</h2>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {banner && (
            <img src={banner} alt="Banner" className="w-full h-32 object-cover" />
          )}
          <div className="p-4 text-center">
            {logo && (
              <img
                src={logo}
                alt="Logo"
                className="h-16 w-16 mx-auto object-contain mb-2"
              />
            )}
            <h3 className="text-lg font-semibold">{storeName}</h3>
            <p className="text-gray-600 text-sm mt-1">{description}</p>

            {/* Badges */}
            <div className="flex gap-2 justify-center mt-3 flex-wrap">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Products */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="border border-gray-300 rounded-lg p-3 text-center bg-gray-50"
                >
                  <p className="font-medium">{p.name}</p>
                  <p className="text-gray-700">${p.price}</p>
                </div>
              ))}
              {products.length === 0 && (
                <p className="text-gray-400 col-span-2 text-sm">
                  No products added yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
