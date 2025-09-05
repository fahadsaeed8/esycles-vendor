// "use client";

// import { useState } from "react";
// import DashboardLayout from "../../../components/layout/dashboard-layout";

// type Listing = {
//   id: number;
//   type: "Classified" | "RFQ" | "Auction";
//   title: string;
//   description: string;
//   price: number;
// };

// export default function VendorListingsManagement() {
//   const [listings, setListings] = useState<Listing[]>([
//     {
//       id: 1,
//       type: "Classified",
//       title: "Electric Cycle for Sale",
//       description: "Brand new eCycle with lithium battery.",
//       price: 1200,
//     },
//     {
//       id: 2,
//       type: "RFQ",
//       title: "Bulk Order for 50 eCycles",
//       description: "Looking for vendor to supply 50 eCycles.",
//       price: 50000,
//     },
//     {
//       id: 3,
//       type: "Auction",
//       title: "Limited Edition Racing eCycle",
//       description: "Auction starting at $800.",
//       price: 800,
//     },
//   ]);

//   const [newListing, setNewListing] = useState<Listing>({
//     id: 0,
//     type: "Classified",
//     title: "",
//     description: "",
//     price: 0,
//   });

//   const handleChange = (
//     field: keyof Listing,
//     value: string | number
//   ) => {
//     setNewListing((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleAdd = () => {
//     if (!newListing.title || !newListing.description || !newListing.price) {
//       alert("Please fill all fields!");
//       return;
//     }
//     setListings((prev) => [
//       ...prev,
//       { ...newListing, id: Date.now() },
//     ]);
//     setNewListing({ id: 0, type: "Classified", title: "", description: "", price: 0 });
//   };

//   const handleDelete = (id: number) => {
//     setListings((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleEdit = (id: number) => {
//     const listing = listings.find((item) => item.id === id);
//     if (listing) {
//       setNewListing(listing);
//       setListings((prev) => prev.filter((item) => item.id !== id));
//     }
//   };

//   return (
//     <DashboardLayout>
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Manage Listings</h1>

//       {/* Add / Edit Form */}
//       <div className="bg-white p-6 rounded-xl shadow-md border mb-8">
//         <h2 className="text-lg font-semibold mb-4">Add / Edit Listing</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Listing Type
//             </label>
//             <select
//               value={newListing.type}
//               onChange={(e) =>
//                 handleChange("type", e.target.value as Listing["type"])
//               }
//               className="w-full border rounded-lg p-2"
//             >
//               <option value="Classified">Classified</option>
//               <option value="RFQ">RFQ</option>
//               <option value="Auction">Auction</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               value={newListing.title}
//               onChange={(e) => handleChange("title", e.target.value)}
//               className="w-full border rounded-lg p-2"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium mb-1">
//               Description
//             </label>
//             <textarea
//               value={newListing.description}
//               onChange={(e) =>
//                 handleChange("description", e.target.value)
//               }
//               className="w-full border rounded-lg p-2"
//               rows={3}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Price
//             </label>
//             <input
//               type="number"
//               value={newListing.price}
//               onChange={(e) =>
//                 handleChange("price", Number(e.target.value))
//               }
//               className="w-full border rounded-lg p-2"
//             />
//           </div>
//         </div>

//         <button
//           onClick={handleAdd}
//           className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           {newListing.id === 0 ? "Add Listing" : "Save Changes"}
//         </button>
//       </div>

//       {/* Listings Table */}
//       <div className="bg-white p-6 rounded-xl shadow-md border">
//         <h2 className="text-lg font-semibold mb-4">Your Listings</h2>
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-100 border-b">
//             <tr>
//               <th className="px-4 py-2 text-left">Type</th>
//               <th className="px-4 py-2 text-left">Title</th>
//               <th className="px-4 py-2 text-left">Price</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {listings.map((listing) => (
//               <tr
//                 key={listing.id}
//                 className="border-b hover:bg-gray-50 transition"
//               >
//                 <td className="px-4 py-2">{listing.type}</td>
//                 <td className="px-4 py-2">{listing.title}</td>
//                 <td className="px-4 py-2">${listing.price}</td>
//                 <td className="px-4 py-2 flex gap-2">
//                   <button
//                     onClick={() => handleEdit(listing.id)}
//                     className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(listing.id)}
//                     className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {listings.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="text-center py-4 text-gray-500"
//                 >
//                   No listings available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </DashboardLayout>
//   );
// }


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../../components/layout/dashboard-layout";

type Listing = {
  id: number;
  type: "Classified" | "RFQ" | "Auction";
  title: string;
  description: string;
  price: number;
};

export default function VendorListingsManagement() {
  const [listings, setListings] = useState<Listing[]>([
    {
      id: 1,
      type: "Classified",
      title: "Electric Cycle for Sale",
      description: "Brand new eCycle with lithium battery.",
      price: 1200,
    },
    {
      id: 2,
      type: "RFQ",
      title: "Bulk Order for 50 eCycles",
      description: "Looking for vendor to supply 50 eCycles.",
      price: 50000,
    },
    {
      id: 3,
      type: "Auction",
      title: "Limited Edition Racing eCycle",
      description: "Auction starting at $800.",
      price: 800,
    },
  ]);

  const [newListing, setNewListing] = useState<Listing>({
    id: 0,
    type: "Classified",
    title: "",
    description: "",
    price: 0,
  });

  const handleChange = (field: keyof Listing, value: string | number) => {
    setNewListing((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (!newListing.title || !newListing.description || !newListing.price) {
      alert("Please fill all fields!");
      return;
    }
    setListings((prev) => [...prev, { ...newListing, id: Date.now() }]);
    setNewListing({ id: 0, type: "Classified", title: "", description: "", price: 0 });
  };

  const handleDelete = (id: number) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id: number) => {
    const listing = listings.find((item) => item.id === id);
    if (listing) {
      setNewListing(listing);
      setListings((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <DashboardLayout>
    <div className="">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Manage Listings</h1>

      {/* Add / Edit Form */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 mb-8">
        <h2 className="text-lg font-semibold mb-4">Add / Edit Listing</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Listing Type</label>
            <select
              value={newListing.type}
              onChange={(e) => handleChange("type", e.target.value as Listing["type"])}
              className="w-full border border-[#f6a01e] rounded-lg p-2 focus:outline-none"
            >
              <option value="Classified">Classified</option>
              <option value="RFQ">RFQ</option>
              <option value="Auction">Auction</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={newListing.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border border-[#f6a01e] rounded-lg p-2 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newListing.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border border-[#f6a01e] rounded-lg p-2 focus:outline-none resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={newListing.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
              className="w-full border border-[#f6a01e] rounded-lg p-2 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {newListing.id === 0 ? "Add Listing" : "Save Changes"}
        </button>
      </div>

      {/* Listings Table - Desktop */}
      <div className="hidden md:block bg-white rounded-xl shadow-md border border-gray-300">
        <h2 className="text-lg font-semibold p-3">Your Listings</h2>
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, i) => (
              <motion.tr
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-gray-300 last:border-none hover:bg-gray-50"
              >
                <td className="px-4 py-2">{listing.type}</td>
                <td className="px-4 py-2">{listing.title}</td>
                <td className="px-4 py-2 font-semibold">${listing.price}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(listing.id)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(listing.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
            {listings.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No listings available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {listings.map((listing, i) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl shadow-md p-4 border border-[#f6a01e]"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{listing.title}</h2>
              <span className="px-2 py-1 text-xs rounded-full font-medium bg-gray-100 text-gray-700">
                {listing.type}
              </span>
            </div>
            <p className="mt-1 text-gray-500">{listing.description}</p>
            <p className="mt-1 font-semibold">${listing.price}</p>
            <div className="mt-2 flex gap-2 flex-wrap">
              <button
                onClick={() => handleEdit(listing.id)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(listing.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </DashboardLayout>
  );
}
