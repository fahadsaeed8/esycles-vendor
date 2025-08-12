import React from "react";
import Sidebar from "../../common/sidebar";
import Navbar from "../../common/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main Content Area */}
      <div className="w-full flex flex-col overflow-x-hidden">
        <Navbar />

        <main className="w-full h-[calc(100vh-50px)] p-4 overflow-y-auto overflow-x-hidden bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
