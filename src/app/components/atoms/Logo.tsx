import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center">
      <svg
        className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        />
      </svg>
      <span className="text-white text-sm sm:text-lg font-semibold sm:block">
        Valerio.ai
      </span>
    </div>
  );
}
