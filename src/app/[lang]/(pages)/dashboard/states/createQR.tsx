import Button from "@/components/button";
import QRCodeGenerator from "@/components/QRcode";
import React, { useState } from "react";

export const CreateQR = ({ data, setData }: any) => {
  const [createState, setCreateState] = useState(false);
  return (
    <div className="w-full h-full p-24">
      {/* <div className="w-full p-4">
        {!createState && (
          <div className="w-[200px] h-[48px]">
            <Button
              title="Create new QR"
              background="green"
              color="white"
              onClick={() => setCreateState(true)}
            />
          </div>
        )}
      </div> */}
      <QRCodeGenerator userId={data?._id} />
      {/* <div className="flex flex-col gap-2">
        <h3 className="font-[600]">QR Codes</h3>
        <div>List here</div>
      </div> */}
    </div>
  );
};
