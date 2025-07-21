"use client";
import { useEffect } from "react";
import * as React from "react";
import { useAppContext } from "../context/app";

const SimpleSnackbar: React.FC = () => {
  const { alert, setAlert } = useAppContext();

  useEffect(() => {
    if (alert.active) {
      const timer = setTimeout(() => {
        setAlert({ active: false, type: "", text: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);
  return (
    <>
      {alert.active && (
        <div className="mt-4 space-y-2 absolute bottom-4 left-4">
          <div
            className={`px-2 py-1 rounded-md text-white text-center ${
              alert.type === "success"
                ? "bg-green-600"
                : alert.type === "error"
                ? "bg-red-600"
                : alert.type === "warning"
                ? "bg-yellow-600"
                : "bg-blue-600"
            }`}
          >
            {alert.text}
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleSnackbar;
