import React, { useState } from "react";
import { Input } from "./input";
import Button from "./button";
import { useAppContext } from "@/context/app";
import SelectComponent from "./select";
import { DatePickerComponent } from "./datePicker";
import SimpleSnackbar from "@/components/snackbar";
import axios from "axios";

const RequestForm = () => {
  const { theme, activeLanguage, setAlert } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  async function sendEmail() {
    if (name?.length < 1 || email?.length < 1 || phone?.length < 1) {
      return setAlert({
        text: activeLanguage.pleseInputFields,
        type: "warning",
        active: true,
      });
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/send-email", {
        to: email,
        subject: "New Request",
        text: JSON.stringify({
          name: name,
          phone: phone,
          email: email,
          comment: comment,
        }),
      });

      setAlert({
        text: activeLanguage.requestSentSuccessfully,
        type: "success",
        active: true,
      });

      setName("");
      setEmail("");
      setPhone("");
      setComment("");
    } catch (error: any) {
      console.error("❌ Email sending failed:", error);

      const errorMessage =
        error.response?.data?.error || error.message || "Unknown error";

      setAlert({
        text: `${activeLanguage.errorSendingRequest}: ${errorMessage}`,
        type: "error",
        active: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full desktop:w-[720px] desktop:py-8">
      <h3
        style={{ color: theme.text }}
        className="font-bold text-[24px] desktop:my-4"
      >
        {activeLanguage.requestForm}
      </h3>
      <div className="max-h-16">
        <Input
          type="text"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          label={activeLanguage.fullName + "*"}
        />
      </div>

      <div className="max-h-16">
        <Input
          type="text"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          label={activeLanguage.email + "*"}
        />
      </div>

      <div className="max-h-16">
        <Input
          type="text"
          value={phone}
          onChange={(e: any) => setPhone(e.target.value)}
          label={activeLanguage.phone + "*"}
        />
      </div>
      <div className="max-h-24 overflow-hidden shadow-md rounded-xl">
        <textarea
          rows={1}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          className="w-full h-24 shado-xl resize-none bg-white text-black p-2 rounded-xl focus:outline-none"
          placeholder={`${activeLanguage?.comment} ${activeLanguage?.optional}`}
        />
      </div>

      <div className="pb-12">
        <div className="h-12  w-full rounded-full mt-6 shadow-xl">
          <Button
            title={activeLanguage.sendRequest}
            background="linear-gradient(45deg, rgba(0, 183, 255, 1) 0%, rgba(180, 87, 199, 1) 50%, rgba(237, 209, 83, 1) 100%)"
            color={theme.main}
            loading={loading}
            onClick={() => sendEmail()}
          />
        </div>
        <SimpleSnackbar />
      </div>
    </div>
  );
};

export default RequestForm;
