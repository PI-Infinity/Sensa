import { useEffect, useRef, useState } from "react";
import { AiFillDislike } from "react-icons/ai";
import { FaAngry, FaHeart } from "react-icons/fa";
import { FaFaceGrinStars } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import Switch from "@mui/material/Switch";
import { Input } from "@/components/input";
import Image from "next/image";
import Button from "@/components/button";
import { SketchPicker } from "react-color";
import { Rating } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { BiHappyHeartEyes, BiImageAlt } from "react-icons/bi";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useAppContext } from "@/context/app";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const Customize = ({ data, setData }: any) => {
  const { alert, setAlert, activeLanguage } = useAppContext();
  const [config, setConfig] = useState<any>({
    businessTitle: "",
    businessSlogan: "",
    feedbackTypes: ["emojy", "stars", "comment"],
    logo: "",
    colors: { background: "#fff", primary: "#000", text: "#000" },
  });

  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState("");

  const MIN = 300;
  const MAX = 1000;

  const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const MAX_SIZE_MB = 2;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  useEffect(() => {
    if (!image) return;

    // ფორმატი & ზომის ვალიდაცია
    if (!ACCEPTED_TYPES.includes(image.type)) {
      setAlert({
        active: true,
        type: "error",
        text: "დაშვებულია მხოლოდ jpeg, jpg, png და webp ფორმატები.",
      });
      return setImage(null);
    }

    if (image.size > MAX_SIZE_BYTES) {
      setAlert({
        active: true,
        type: "error",
        text: `ფაილის ზომა არ უნდა აღემატებოდეს ${MAX_SIZE_MB}MB-ს.`,
      });
      return setImage(null);
    }

    const url = URL.createObjectURL(image);
    const img = document.createElement("img");

    img.onload = () => {
      const { width, height } = img;
      if (width < MIN || height < MIN || width > MAX || height > MAX) {
        setAlert({
          active: true,
          type: "error",
          text: `ზომა უნდა იყოს მინიმუმ ${MIN}px და მაქსიმუმ ${MAX}px. ატვირთული იყო ${width}x${height}px`,
        });
        return setImage(null);
      } else {
        setError("");
      }
    };

    img.onerror = () => {
      setError("სურათის წაკითხვა ვერ მოხერხდა.");
      setImage(null);
    };

    img.src = url;

    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleUpload = (): Promise<string | null> => {
    setSaveLoading(true);

    return new Promise((resolve, reject) => {
      const file = image;
      if (!file) return resolve(null);

      const img = document.createElement("img");
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = async () => {
        try {
          const storageRef = ref(storage, `avatars/${data?.clerkId}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          setError("");
          URL.revokeObjectURL(objectUrl);
          resolve(downloadUrl);
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = () => {
        setError("სურათის წაკითხვა ვერ მოხერხდა.");
        URL.revokeObjectURL(objectUrl);
        resolve(null);
      };
    });
  };

  useEffect(() => {
    setConfig({
      businessTitle: data?.businessTitle,
      businessSlogan: data?.businessSlogan,
      feedbackTypes: data?.feedbackTypes,
      logo: data?.logo,
      colors: data?.colors,
    });
  }, [data]);

  const handleToggle = (type: string) => {
    setConfig((prev: any) => ({
      ...prev,
      feedbackTypes: prev.feedbackTypes?.includes(type)
        ? prev.feedbackTypes.filter((t: any) => t !== type)
        : [...prev.feedbackTypes, type],
    }));
  };

  const [showPicker, setShowPicker] = useState<any>(null);

  // click outside → close popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // თუ დაჭერა მოხდა რომელიმე პალიტრის შიგნით — არ დახურო
      if (target.closest(".color-picker-popup")) return;

      // ყველა შემთხვევაში დახურე
      setShowPicker(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // feedback state
  const defaultFeedback = {
    stars: 0,
    emojy: "",
    comment: "",
  };
  const [feedback, setFeedback] = useState(defaultFeedback);
  // save business config
  const [saveLoading, setSaveLoading] = useState(false);
  const saveBusinessConfig = async () => {
    if (config?.feedbackTypes?.length < 1) {
      return setAlert({
        active: true,
        type: "error",
        text: `აუცილებელია რომელიმე შეფასების სტილის მონიშვნა`,
      });
    } else if (config?.businessTitle?.length < 1) {
      return setAlert({
        active: true,
        type: "error",
        text: `კომპანიის სახელი აუცილებელია`,
      });
    }
    const fileUrl = await handleUpload();
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: fileUrl
          ? JSON.stringify({ ...config, logo: fileUrl })
          : JSON.stringify({ ...config }), // config-ს უკვე აქვს title, slogan და სხვა
      });

      if (!res.ok) throw new Error("Failed to save config");

      if (fileUrl) {
        setData((prev: any) => ({ ...prev, ...config, logo: fileUrl }));
      } else {
        setData((prev: any) => ({ ...prev, ...config }));
      }
      setTimeout(() => {
        setImage(null);
        setSaveLoading(false);
      }, 1500);
    } catch (err) {
      console.error("❌ Error saving config:", err);
    }
  };

  const arraysHaveSameItems = (a: any[], b: any[]) => {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;

    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, index) => val === sortedB[index]);
  };

  const objectsAreEqual = (a: any, b: any) => {
    if (typeof a !== "object" || typeof b !== "object" || !a || !b)
      return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => a[key] === b[key]);
  };

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
        userId: data?._id,
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

      try {
        const response = await axios.post(`/api/feedback`, fdbk);

        if (response?.data?.status === "success") {
          setFeedback({
            stars: 0,
            emojy: "",
            comment: "",
          });

          return setMessage({
            active: true,
            type: "success",
            text: "Feedback sent successfully!",
          });
        }
      } catch (error: any) {
        console.log(error?.response?.data?.message || "Unknown error");

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
    <div className="w-full h-full desktop:p-4 p-2 flex desktop:flex-row flex-col gap-2 desktop:gap-4">
      <div className="flex flex-col gap-8 desktop:w-2/6 border rounded-xl p-4">
        <h3 className="mr-auto font-[600] text-[#111] text-xl">
          {activeLanguage.identity}
        </h3>
        <div className="flex flex-col gap-4">
          <h2 className="text-md font-[600]">{activeLanguage.company}*</h2>
          <div className="w-[300px]">
            <Input
              label="Title"
              value={config?.businessTitle}
              maxLength={40}
              onChange={(e) =>
                setConfig((prev: any) => ({
                  ...prev,
                  businessTitle: e.target.value,
                }))
              }
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-md font-[600]">
            {activeLanguage.slogan} {activeLanguage.optional}
          </h2>
          <div className="desktop:w-[400px]">
            <textarea
              value={config?.businessSlogan}
              onChange={(e) =>
                setConfig((prev: any) => ({
                  ...prev,
                  businessSlogan: e.target.value,
                }))
              }
              maxLength={140}
              className="w-full min-h-[120px] max-h-[120px] p-4 shadow-md resize-y bg-white text-black rounded-xl focus:outline-none break-words"
              placeholder="Slogan (max 140 characters)"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            style={{
              boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
            }}
            className="relative cursor-pointer overflow-hidden rounded-xl w-[100px] h-[100px] flex items-center"
          >
            {image ? (
              <Image
                src={URL.createObjectURL(image)}
                alt="img"
                width={100}
                height={100}
              />
            ) : config?.logo ? (
              <Image src={config.logo} alt="img" width={100} height={100} />
            ) : (
              <div className="w-full h-full flex items-center justify-center cursor-pointer">
                <BiImageAlt size={96} color="#b9b9b9" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) setImage(e.target.files[0]);
              }}
              style={{ opacity: 0, position: "absolute" }}
              className="w-full h-full cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-[2px]">
            <p className="font-[600] text-md">
              {activeLanguage.logo} {activeLanguage.optional}
            </p>
            <p className="font-[500] text-[10px] text-[#666] mt-1">
              - {activeLanguage.recommendedSize}: ({activeLanguage.min}. 300px /{" "}
              {activeLanguage.max}. 1000px)
              {activeLanguage.square}
            </p>
            <p className="font-[500] text-[10px] text-[#666]">
              - {activeLanguage.acceptedFormats}: JPEG, PNG, WEBP
            </p>
            <p className="font-[500] text-[10px] text-[#666]">
              - {activeLanguage.maximumFileSize}: 2 MB.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 desktop:w-2/6 border rounded-xl p-4">
        <div className="w-full">
          <h3 className="mr-auto font-[600] text-[#111] text-xl">
            {activeLanguage.feedbackTypes}
          </h3>

          {/* Stars */}
          <div className="text-md font-bold flex items-center gap-2 mt-4">
            <div className="flex items-center gap-2">
              <Switch
                onChange={() => handleToggle("stars")}
                checked={config?.feedbackTypes?.includes("stars")}
              />

              {Array.from({ length: 5 }).map((_, idx) => (
                <IoStarSharp key={idx} color="orange" size={24} />
              ))}
            </div>
          </div>

          {/* Emojy Switch */}
          <div className="text-md font-bold flex items-center gap-2 mt-4">
            <div className="flex items-center gap-2">
              <Switch
                onChange={() => handleToggle("emojy")}
                checked={config?.feedbackTypes?.includes("emojy")}
              />
            </div>
            <AiFillDislike
              size={20}
              color="blue"
              style={{ transform: "rotate(180deg)" }}
            />
            <AiFillDislike size={20} color="red" />
            <FaHeart size={19} color="red" />
            <FaFaceGrinStars size={19} color="orange" />
            <FaAngry size={20} color="red" />
          </div>

          {/* Comments */}
          <div className="flex items-center gap-2 mt-4">
            <Switch
              onChange={() => handleToggle("comment")}
              checked={config?.feedbackTypes?.includes("comment")}
            />
            <p className="text-md font-[600]">{activeLanguage.comment}</p>
          </div>
        </div>
        <h3 className="mr-auto font-[600] text-[#111] text-xl mt-8">
          {activeLanguage.colorScheme}
        </h3>
        <div className="flex flex gap-4 items-center ml-3">
          <button
            className="w-10 h-10 rounded-full border shadow"
            style={{ backgroundColor: config?.colors?.background }}
            onClick={() =>
              setShowPicker(showPicker === "background" ? null : "background")
            }
          />
          <h2 className="text-md font-[600]">{activeLanguage.background}</h2>
          {showPicker === "background" && (
            <div className="mb-8">
              <div className="absolute color-picker-popup">
                <SketchPicker
                  color={config?.colors?.background}
                  onChangeComplete={(newColor) =>
                    setConfig((prev: any) => ({
                      ...prev,
                      colors: { ...prev.colors, background: newColor.hex },
                    }))
                  }
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex items-center gap-4 ml-3">
          <button
            className="w-10 h-10 rounded-full border shadow"
            style={{ backgroundColor: config?.colors?.primary }}
            onClick={() =>
              setShowPicker(showPicker === "primary" ? null : "primary")
            }
          />
          <h2 className="text-md font-[600]">{activeLanguage.primary}</h2>
          {showPicker === "primary" && (
            <div className="mb-8">
              <div className="absolute color-picker-popup">
                <SketchPicker
                  color={config?.colors?.primary}
                  onChangeComplete={(newColor) =>
                    setConfig((prev: any) => ({
                      ...prev,
                      colors: { ...prev.colors, primary: newColor.hex },
                    }))
                  }
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 ml-3">
          <button
            className="w-10 h-10 rounded-full border shadow"
            style={{
              backgroundColor: config?.colors?.text,
            }}
            onClick={() => setShowPicker(showPicker === "text" ? null : "text")}
          />
          <h2 className="text-md font-[600]">{activeLanguage.text}</h2>
          {showPicker === "text" && (
            <div className="mb-8">
              <div className="absolute color-picker-popup">
                <SketchPicker
                  color={config?.colors?.text}
                  onChangeComplete={(newColor) =>
                    setConfig((prev: any) => ({
                      ...prev,
                      colors: { ...prev.colors, text: newColor.hex },
                    }))
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="desktop:w-2/6 flex flex-col items-end border rounded-xl p-4 desktop:p-6">
        <div className="w-[100px] h-[32px] mb-6 rounded-full ml-auto shadow-md flex items-center justify-center">
          {saveLoading ? (
            <div className="w-[100px] h-[32px] flex items-center justify-center">
              <ClipLoader size={20} color="orange" />
            </div>
          ) : (
            <Button
              title={activeLanguage.save}
              background="green"
              color={"white"}
              disabled={
                data?.businessTitle === config?.businessTitle &&
                data?.businessSlogan === config?.businessSlogan &&
                data?.logo === config?.logo &&
                arraysHaveSameItems(
                  data?.feedbackTypes,
                  config?.feedbackTypes
                ) &&
                objectsAreEqual(data?.colors, config?.colors) &&
                !image
              }
              onClick={saveBusinessConfig}
            />
          )}
        </div>

        <div className="w-full relative rounded-xl pb-16 desktop:pb-0">
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
          <div
            className="w-full h-full rounded-xl shadow-md relative flex flex-col p-4 desktop:p-8 gap-4"
            style={{ background: config?.colors?.background }}
          >
            <div className="flex flex-col gap-4 w-full items-start">
              {image ? (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="img"
                  width={48}
                  height={48}
                  style={{
                    borderRadius: "4px",
                  }}
                />
              ) : config?.logo ? (
                <Image
                  src={config.logo}
                  alt="img"
                  width={48}
                  height={48}
                  style={{
                    borderRadius: "4px",
                  }}
                />
              ) : null}

              {config?.businessTitle?.length > 0 && (
                <h3
                  className="text-2xl font-[600] break-words w-full max-w-72"
                  style={{
                    color:
                      config?.colors?.text?.length > 0
                        ? config?.colors?.text
                        : "#111",
                  }}
                >
                  {config?.businessTitle}
                </h3>
              )}
            </div>
            {config?.businessSlogan?.length > 0 && (
              <p
                className="text-md font-[500 break-words w-full max-w-72]"
                style={{
                  color:
                    config?.colors?.text?.length > 0
                      ? config?.colors?.text
                      : "#111",
                }}
              >
                {config?.businessSlogan}
              </p>
            )}
            <h3
              className="text-xl font-[500] break-words w-full max-w-72] mt-2"
              style={{
                color:
                  config?.colors?.text?.length > 0
                    ? config?.colors?.text
                    : "#111",
              }}
            >
              Rate our service!
            </h3>
            <div className="fle flex-col gap-6 mt-2 w-full">
              {config?.feedbackTypes?.includes("stars") && (
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
              {config?.feedbackTypes?.includes("emojy") && (
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
              {config?.feedbackTypes?.includes("comment") && (
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
                    config?.colors?.primary?.length > 0
                      ? config?.colors?.primary
                      : "green"
                  }
                  color={"white"}
                  onClick={SendFeedback}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
