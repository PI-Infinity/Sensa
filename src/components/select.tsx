import React from "react";
import Select from "react-select";

export default function SelectComponent({ data, value, setValue }: any) {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      height: "52px",
      borderRadius: "0.75rem",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "black",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      // lineHeight: "3rem", // Center align text vertically
    }),
  };

  return (
    <div className="w-full h-13 rounded-xl">
      <Select
        options={data}
        styles={customStyles}
        defaultValue={value.id}
        value={value.id}
        onChange={setValue}
        placeholder={value.label}
      />
    </div>
  );
}
