// components/VendorAccessModal.tsx
"use client";

import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
}

const VendorAccessModal = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center"
      >
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-red-500 w-12 h-12" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
        <p className="text-gray-600 mb-6">
          Please login from the customer portal with a vendor account to access
          this dashboard.
        </p>
        <button
          onClick={onClose}
          className="px-5 py-2 cursor-pointer bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Go to Customer Portal
        </button>
      </motion.div>
    </div>
  );
};

export default VendorAccessModal;
