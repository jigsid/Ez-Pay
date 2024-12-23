"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
    >
      {children}
    </button>
  );
};
