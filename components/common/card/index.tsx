import React, { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, footer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 w-[92vw] mx-auto sm:w-full md:max-w-md">
      {/* Card Header - Fixed height */}
      <div className="px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] rounded-t-lg">
        <h3 className="text-white text-base md:text-lg font-medium line-clamp-2">
          {title}
        </h3>
      </div>

      {/* Card Body - Flexible but constrained */}
      <div className="px-4 py-3 md:px-6 md:py-4 text-gray-700 text-sm md:text-base max-h-[60vh] overflow-y-auto">
        {children}
      </div>

      {/* Card Footer - Fixed height */}
      {footer && (
        <div className="px-4 py-2 md:px-6 md:py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg text-sm md:text-base">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
