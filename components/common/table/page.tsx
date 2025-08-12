"use client";
import React, { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

// Generic column type
interface Column<T> {
  key: keyof T;
  label: string;
  className?: string;
}

interface CommonTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  highlightKey?: keyof T;
  accordion?: (row: T) => React.ReactNode;
}

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  highlightKey,
  accordion,
}: CommonTableProps<T>) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.style.maxHeight = openIndex === i ? `${ref.scrollHeight}px` : "0px";
      }
    });
  }, [openIndex]);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden border border-gray-200 shadow-md rounded-lg">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white text-base sticky top-0 z-10">
                <tr>
                  {accordion && <th className="w-10"></th>}
                  {columns.map((col) => (
                    <th
                      key={String(col.key)}
                      scope="col"
                      className={`px-4 py-3 sm:px-6 sm:py-3 text-left whitespace-nowrap text-xs md:text-sm font-medium uppercase tracking-wider ${
                        col.className || ""
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((row, index) => (
                  <React.Fragment key={index}>
                    <tr
                      onClick={() => accordion && toggleAccordion(index)}
                      className={`hover:bg-orange-50 transition duration-300 ${
                        accordion ? "cursor-pointer" : ""
                      }`}
                    >
                      {accordion && (
                        <td className="px-4 text-center align-middle text-gray-500">
                          {openIndex === index ? (
                            <Minus size={16} className="inline-block" />
                          ) : (
                            <Plus size={16} className="inline-block" />
                          )}
                        </td>
                      )}
                      {columns.map((col) => (
                        <td
                          key={String(col.key)}
                          className={`px-4 py-4 sm:px-6 whitespace-nowrap text-sm align-middle ${
                            col.key === highlightKey
                              ? "text-green-600 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {col.key === "options" ? (
                            <div className="flex items-center gap-3 text-lg justify-center">
                              <button
                                title="View"
                                className="text-gray-600 hover:text-orange-500 cursor-pointer"
                              >
                                👁️
                              </button>
                              <button
                                title="Download"
                                className="text-gray-600 hover:text-orange-500 cursor-pointer"
                              >
                                ⬇️
                              </button>
                              <button
                                title="Delete"
                                className="text-gray-600 hover:text-red-500 cursor-pointer"
                              >
                                🗑️
                              </button>
                            </div>
                          ) : (
                            String(row[col.key])
                          )}
                        </td>
                      ))}
                    </tr>

                    {accordion && (
                      <tr>
                        <td
                          colSpan={(columns.length || 0) + 1}
                          className="p-0 bg-gray-50"
                        >
                          <div
                            ref={(el) => {
                              contentRefs.current[index] = el;
                            }}
                            className="transition-all duration-300 ease-in-out overflow-hidden"
                            style={{
                              maxHeight: openIndex === index ? "999px" : "0px",
                            }}
                          >
                            <div className="px-6 py-4">{accordion(row)}</div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
