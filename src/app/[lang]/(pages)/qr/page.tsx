"use client";
import Button from "@/components/button";
import { useAppContext } from "@/context/app";
import { Rating } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillDislike } from "react-icons/ai";
import { BiHappyHeartEyes, BiImageAlt } from "react-icons/bi";
import { FaAngry, FaHeart } from "react-icons/fa";
import { FaFaceGrinStars } from "react-icons/fa6";
import { MoonLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";

const QR = () => {
  const { theme, language, loading, activeLanguage } = useAppContext();

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [user, setUser] = useState<any>(null);

  const [loadData, setLoadData] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/" + userId);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to fetch user");
        setUser(data);
      } catch (err) {
        console.error("❌ Error loading user:", err);
      } finally {
        setLoadData(false);
      }
    };

    fetchUser();
  }, [userId]);

  // feedback state
  const defaultFeedback = {
    stars: 0,
    emojy: "",
    comment: "",
  };
  const [feedback, setFeedback] = useState(defaultFeedback);

  const [sendingLoading, setSendingLoading] = useState(false);
  // send message
  const [message, setMessage] = useState({ active: false, type: "", text: "" });

  const SendFeedback = async () => {
    if (feedback?.comment?.length > 0 && feedback?.comment?.length < 4) {
      return setMessage({
        active: true,
        type: "error",
        text: "Comment must include min 3 characters!",
      });
    }
    if (
      feedback?.stars > 0 ||
      feedback?.emojy?.length > 0 ||
      feedback?.comment?.length > 3
    ) {
      const fdbk: any = {
        userId: user?._id,
        createdAt: new Date(),
        status: "unread",
      };

      if (feedback?.stars && `${feedback.stars}`.length > 0) {
        fdbk.stars = feedback.stars;
      }

      if (feedback?.emojy && `${feedback.emojy}`.length > 0) {
        fdbk.emojy = feedback.emojy;
      }

      if (feedback?.comment && `${feedback.comment}`.trim().length > 0) {
        fdbk.comment = feedback.comment;
      }
      setSendingLoading(true);
      try {
        const response = await axios.post(`/api/feedback`, fdbk);

        if (response?.data?.status === "success") {
          setFeedback({
            stars: 0,
            emojy: "",
            comment: "",
          });

          setSendingLoading(false);
          return setMessage({
            active: true,
            type: "success",
            text: "Feedback sent successfully!",
          });
        }
      } catch (error: any) {
        console.log(error?.response?.data?.message || "Unknown error");
        setSendingLoading(false);
        return setMessage({
          active: true,
          type: "error",
          text: error?.response?.data?.message || "Failed to send feedback",
        });
      }
    } else {
      return setMessage({
        active: true,
        type: "error",
        text: "Please choice any feedback",
      });
    }
  };
  return (
    <>
      {loadData ? (
        <div className="w-full h-[100vh] rounded-xl shadow-md relative flex flex-col gap-4 items-center justify-center">
          <MoonLoader size={32} color="blue" />
        </div>
      ) : (
        <div
          className="w-full h-[100vh] rounded-xl shadow-md relative flex flex-col gap-4"
          style={{ background: user?.colors?.background }}
        >
          {message?.active && (
            <div
              onClick={() => setMessage({ active: false, text: "", type: "" })}
              className="w-full h-full absolute z-10 rounded-xl flex flex-col gap-2 items-center justify-center"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              {message?.type === "success" ? (
                <BiHappyHeartEyes size={40} color="orange" />
              ) : (
                <p className="text-[40px] font-[600] text-[red]">X</p>
              )}
              <p className="font-[600]">{message?.text}</p>
            </div>
          )}
          <div className="w-full h-full flex flex-col gap-4 p-8">
            <div className="flex flex-col gap-4 w-full items-start">
              {user?.logo ? (
                <Image
                  src={user.logo}
                  alt="img"
                  width={80}
                  height={80}
                  style={{
                    borderRadius: "4px",
                  }}
                />
              ) : null}

              {user?.businessTitle?.length > 0 && (
                <h3
                  className="text-2xl font-[600] break-words w-full max-w-72"
                  style={{
                    color:
                      user?.colors?.text?.length > 0
                        ? user?.colors?.text
                        : "#111",
                  }}
                >
                  {user?.businessTitle}
                </h3>
              )}
            </div>
            {user?.businessSlogan?.length > 0 && (
              <p
                className="text-md font-[500 break-words w-full max-w-72]"
                style={{
                  color:
                    user?.colors?.text?.length > 0
                      ? user?.colors?.text
                      : "#111",
                }}
              >
                {user?.businessSlogan}
              </p>
            )}
            <h3
              className="text-xl font-[500] break-words w-full max-w-72] mt-2"
              style={{
                color:
                  user?.colors?.text?.length > 0 ? user?.colors?.text : "#111",
              }}
            >
              Rate our service!
            </h3>
            <div className="fle flex-col gap-6 mt-2 w-full">
              {user?.feedbackTypes?.includes("stars") && (
                <div className="flex items-center gap-4 w-full">
                  <Rating
                    name="simple-controlled"
                    size="large"
                    value={feedback?.stars || 0}
                    onChange={(event, newValue) => {
                      setFeedback((prev: any) => ({
                        ...prev,
                        stars: newValue,
                      }));
                    }}
                  />
                </div>
              )}
              {user?.feedbackTypes?.includes("emojy") && (
                <div className="flex items-center gap-5 mt-6">
                  <AiFillDislike
                    size={24}
                    color={feedback?.emojy === "like" ? "green" : "#e1e1e1"}
                    style={{ cursor: "pointer", transition: "ease-in 200ms" }}
                    className="hover:scale-[1.3] hover:color rotate-[180deg]"
                    onClick={() => {
                      if (feedback?.emojy === "like") {
                        setFeedback((prev: any) => ({ ...prev, emojy: "" }));
                      } else {
                        setFeedback((prev: any) => ({
                          ...prev,
                          emojy: "like",
                        }));
                      }
                    }}
                  />
                  <AiFillDislike
                    size={24}
                    color={feedback?.emojy === "dislike" ? "red" : "#e1e1e1"}
                    style={{ cursor: "pointer", transition: "ease-in 200ms" }}
                    className="hover:scale-[1.3]"
                    onClick={() => {
                      if (feedback?.emojy === "dislike") {
                        setFeedback((prev: any) => ({ ...prev, emojy: "" }));
                      } else {
                        setFeedback((prev: any) => ({
                          ...prev,
                          emojy: "dislike",
                        }));
                      }
                    }}
                  />
                  <FaHeart
                    size={23}
                    color={feedback?.emojy === "heart" ? "red" : "#e1e1e1"}
                    style={{ cursor: "pointer", transition: "ease-in 200ms" }}
                    className="hover:scale-[1.3]"
                    onClick={() => {
                      if (feedback?.emojy === "heart") {
                        setFeedback((prev: any) => ({ ...prev, emojy: "" }));
                      } else {
                        setFeedback((prev: any) => ({
                          ...prev,
                          emojy: "heart",
                        }));
                      }
                    }}
                  />
                  <FaFaceGrinStars
                    size={23}
                    color={feedback?.emojy === "happy" ? "orange" : "#e1e1e1"}
                    style={{ cursor: "pointer", transition: "ease-in 200ms" }}
                    className="hover:scale-[1.3]"
                    onClick={() => {
                      if (feedback?.emojy === "happy") {
                        setFeedback((prev: any) => ({ ...prev, emojy: "" }));
                      } else {
                        setFeedback((prev: any) => ({
                          ...prev,
                          emojy: "happy",
                        }));
                      }
                    }}
                  />
                  <FaAngry
                    size={24}
                    color={feedback?.emojy === "angry" ? "red" : "#e1e1e1"}
                    style={{ cursor: "pointer", transition: "ease-in 200ms" }}
                    className="hover:scale-[1.3]"
                    onClick={() => {
                      if (feedback?.emojy === "angry") {
                        setFeedback((prev: any) => ({ ...prev, emojy: "" }));
                      } else {
                        setFeedback((prev: any) => ({
                          ...prev,
                          emojy: "angry",
                        }));
                      }
                    }}
                  />
                </div>
              )}
              {user?.feedbackTypes?.includes("comment") && (
                <div className="w-full mt-8">
                  <textarea
                    value={feedback?.comment}
                    onChange={(e) =>
                      setFeedback((prev: any) => ({
                        ...prev,
                        comment: e.target.value,
                      }))
                    }
                    maxLength={500}
                    className="w-full min-h-[120px] max-h-[120px] p-4 shadow-md resize-y bg-white text-black rounded-xl focus:outline-none break-words"
                    placeholder="Comment (max 500 characters)"
                  />
                </div>
              )}
              <div className="w-full h-12 rounded-full mt-6">
                <Button
                  title="Send"
                  background={
                    user?.colors?.primary?.length > 0
                      ? user?.colors?.primary
                      : "green"
                  }
                  color={"white"}
                  onClick={SendFeedback}
                  loading={sendingLoading}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QR;
