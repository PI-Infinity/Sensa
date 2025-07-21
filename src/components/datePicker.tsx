import { useAppContext } from "../context/app";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerComponent = ({
  startingDate,
  setStartingDate,
  endingDate,
  setEndingDate,
}: any) => {
  const { theme } = useAppContext();
  const { activeLanguage } = useAppContext();

  return (
    <div className={`flex items-center gap-4 `}>
      <div className="flex flex-col desktop:flex-row items-center gap-2 text-sm font-semibold w-full italic">
        <div
          className="flex items-center justify-between gap-4 w-full pl-8 desktop:pl-0"
          style={{
            border: `1px solid ${theme.line}`,
            borderRadius: "10px",
          }}
        >
          <span
            style={{
              color: theme.text,
            }}
          >
            {activeLanguage.start}:
          </span>
          <DatePicker
            selected={startingDate}
            onChange={(dt: any) => setStartingDate(dt)}
            dateFormat="dd/MMMM/yyyy"
            className="w-full h-12 py-2 px-3 rounded-xl focus:outline-none text-[16px] max-w-[200px]"
          />
        </div>
        <div
          className="flex items-center justify-between w-full gap-4 pl-8 desktop:pl-0"
          style={{
            border: `1px solid ${theme.line}`,
            borderRadius: "10px",
          }}
        >
          <span
            style={{
              color: theme.text,
            }}
          >
            {activeLanguage.end}:
          </span>
          <DatePicker
            selected={endingDate}
            onChange={(dt: any) => setEndingDate(dt)}
            dateFormat="dd/MMMM/yyyy"
            className="w-full h-12 py-2 px-3 rounded-xl focus:outline-none text-[16px] max-w-[200px]"
          />
        </div>
      </div>
    </div>
  );
};
