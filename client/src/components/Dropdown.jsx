import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';

const Dropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-44">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-xl border border-gray-300 shadow-sm flex justify-between"
      >
        {value}
        <span className="text-gray-500">▼</span>
      </button>

      {/* DROPDOWN LIST */}
      {open && (
        <div className="absolute w-full mt-2 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 z-50">
          {blogCategories.map((item) => (
            <div
              key={item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
