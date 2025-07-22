"use client";
import { useAppContext } from "@/context/app";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiFillDislike } from "react-icons/ai";
import { FaAngry, FaHeart } from "react-icons/fa";
import { FaFaceGrinStars } from "react-icons/fa6";
import { MoonLoader } from "react-spinners";
import { FormatDate } from "@/components/formatDate";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { MdDelete } from "react-icons/md";
import Button from "@/components/button";

export const Feedbacks = ({ data, setData }: any) => {
  const { isMobile, activeLanguage } = useAppContext();

  const scrollRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [feedbackStats, setFeedbackStats] = useState<any>({
    feedbacks: [],
    totalFeedbacks: 0,
    filteredCount: 0,
    unreadCount: 0,
    todayCount: 0,
    lastMonthCount: 0,
    emojiCount: 0,
    emojiBreakdown: [],
    commentCount: 0,
    starsCount: 0,
    starsAvg: 0,
  });
  const limit = 15;
  const GetFeedbacks = async () => {
    try {
      const res = await axios.get("/api/feedback", {
        params: { userId: data._id, page: 1, limit: 15, filter },
      });

      setFeedbackStats({
        feedbacks: res.data.feedbacks || [],
        totalFeedbacks: res.data.totalFeedbacks,
        filteredCount: res.data.filteredCount,
        unreadCount: res.data.unreadCount,
        todayCount: res.data.todayCount,
        lastMonthCount: res.data.lastMonthCount,
        emojiCount: res.data.emojiCount,
        emojiBreakdown: res.data.emojiBreakdown || [],
        commentCount: res.data.commentCount,
        starsCount: res.data.starsCount,
        starsAvg: res.data.starsAvg,
      });

      setLoading(false);
    } catch (error: any) {
      console.log(
        error?.response?.data?.message || "Failed to fetch feedbacks"
      );
    }
  };
  useEffect(() => {
    if (!data?._id) return;

    GetFeedbacks();
  }, [data?._id, filter]);

  const loadMore = async () => {
    if (!data?._id) return;

    // თუ ჯერ არ ვიცით რამდენია სულ, არ ვტვირთავთ
    if (
      feedbackStats?.filteredCount === null ||
      feedbackStats?.filteredCount === undefined
    )
      return;
    // თუ უკვე მოვიტანეთ ყველა feedback
    if (feedbackStats?.feedbacks.length >= feedbackStats?.filteredCount) return;
    const newPage = page + 1;
    try {
      const res = await axios.get("/api/feedback", {
        params: { userId: data?._id, page: newPage, limit, filter },
      });

      const Data = res.data.feedbacks;

      if (Data.length > 0) {
        setFeedbackStats((prev: any) => {
          // არსებული ID-ების სეტი
          const existingIds = new Set(prev.feedbacks.map((f: any) => f._id));

          // მხოლოდ ახალი feedback-ები
          const newFeedbacks = res.data.feedbacks.filter(
            (item: any) => !existingIds.has(item._id)
          );

          return {
            ...prev,
            feedbacks: [...prev.feedbacks, ...newFeedbacks],
            totalFeedbacks: res.data.totalFeedbacks,
            filteredCount: res.data.filteredCount,
            unreadCount: res.data.unreadCount,
            todayCount: res.data.todayCount,
            lastMonthCount: res.data.lastMonthCount,
            emojiCount: res.data.emojiCount,
            emojiBreakdown: res.data.emojiBreakdown || [],
            commentCount: res.data.commentCount,
            starsCount: res.data.starsCount,
            starsAvg: res.data.starsAvg,
          };
        });

        setPage(newPage);
      }
    } catch (err) {
      console.error("Error loading feedbacks:", err);
    }
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;

    // როცა იუზერი მიუახლოვდება ბოლოში
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMore();
    }
  };

  // read feedback
  const ReadFeedback = async ({ id }: any) => {
    try {
      const response = await axios.patch("/api/feedback", {
        userId: data?._id,
        feedbackId: id,
      });
      if (response.data.status === "success") {
        setFeedbackStats((prev: any) => ({
          ...prev,
          unreadCount: Math.max(prev.unreadCount - 1, 0),
        }));
        setFeedbackStats((prev: any) => ({
          ...prev,
          feedbacks: prev.feedbacks.map((p: any) =>
            p._id === id ? { ...p, status: "read" } : p
          ),
        }));
        setData((prev: any) => ({
          ...prev,
          unreadFeedbacksCount: Math.max(prev.unreadFeedbacksCount - 1, 0),
        }));
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  // confirm delete
  const [confirm, setConfirm] = useState<any>(null);

  // delete feedback
  const DeleteFeedback = async ({ id }: any) => {
    try {
      const response = await axios.delete("/api/feedback", {
        data: {
          userId: data?._id,
          feedbackId: id,
        },
      });

      if (response.data.status === "success") {
        GetFeedbacks();
        setConfirm(null);
      }
    } catch (error: any) {
      console.log(error.response?.data?.message || "Delete error");
    }
  };
  return (
    <div className="w-full h-full desktop:p-4 flex gap-4">
      {loading ? (
        <MoonLoader
          size={24}
          color="blue"
          className="relative left-8 top-8 desktop:left-8 desktop:top-8"
        />
      ) : (
        <div className="font-secondFont w-full flex desktop:flex-row flex-col desktop:gap-2">
          {isMobile && (
            <div className="px-2 pt-1">
              <div className="w-full border rounded-xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-4 w-full">
                  <h2 className="font-[600] ">
                    {activeLanguage.totalEmojies}: ({feedbackStats?.emojiCount})
                  </h2>
                  <div className="flex items-center gap-2">
                    {feedbackStats?.emojiBreakdown
                      .sort((a: any, b: any) => {
                        if (a.count === b.count) {
                          return a.emojy.localeCompare(b.emojy); // ანბანის მიხედვით
                        }
                        return b.count - a.count; // კლებადობით
                      })
                      .map((i: any) => {
                        return (
                          <div
                            key={i.emojy}
                            className="flex items-center gap-1"
                          >
                            {i.emojy === "like" ? (
                              <AiFillDislike
                                size={14}
                                color="blue"
                                style={{
                                  cursor: "pointer",
                                  transition: "ease-in 200ms",
                                  transform: "rotate(180deg)",
                                }}
                                className="hover:scale-[1.3]"
                              />
                            ) : i.emojy === "dislike" ? (
                              <AiFillDislike
                                size={14}
                                color="red"
                                style={{
                                  cursor: "pointer",
                                  transition: "ease-in 200ms",
                                }}
                                className="hover:scale-[1.3]"
                              />
                            ) : i.emojy === "happy" ? (
                              <FaFaceGrinStars
                                size={14}
                                color="orange"
                                style={{
                                  cursor: "pointer",
                                  transition: "ease-in 200ms",
                                }}
                                className="hover:scale-[1.3]"
                              />
                            ) : i.emojy === "heart" ? (
                              <FaHeart
                                size={14}
                                color="red"
                                style={{
                                  cursor: "pointer",
                                  transition: "ease-in 200ms",
                                }}
                                className="hover:scale-[1.3]"
                              />
                            ) : (
                              <FaAngry
                                size={14}
                                color="red"
                                style={{
                                  cursor: "pointer",
                                  transition: "ease-in 200ms",
                                }}
                                className="hover:scale-[1.3]"
                              />
                            )}
                            {i.count}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="flex items-center gap-4 font-[600]">
                  <h2 className="font-[600] ">
                    {activeLanguage.totalGivenStars}: (
                    {feedbackStats?.starsCount})
                  </h2>
                  <Rating
                    name="text-feedback"
                    value={feedbackStats?.starsAvg}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {feedbackStats?.starsAvg.toFixed(2)}
                </div>
                <h2 className="font-[600] ">
                  {activeLanguage.totalComments}: ({feedbackStats?.commentCount}
                  )
                </h2>
              </div>
            </div>
          )}
          <div className="p-2 flex w-full flex-col gap-2 desktop:w-1/2">
            <div className="p-3 border rounded-xl flex items-center gap-4">
              <h2 className="font-[600] ">
                {activeLanguage.total}: {feedbackStats?.totalFeedbacks}{" "}
                {feedbackStats?.unreadFeedbacks > 0 && (
                  <span className="text-[green]">
                    ({feedbackStats?.unreadFeedbacks})
                  </span>
                )}
              </h2>
              <h2 className="font-[600] ">
                {activeLanguage.Today}: {feedbackStats?.todayCount}
              </h2>
              <h2 className="font-[600] ">
                {activeLanguage.lastMonth}: {feedbackStats?.lastMonthCount}
              </h2>
            </div>
            <div
              className="w-[100%] p-4 py-2 flex items-center gap-4 border rounded-xl"
              style={{ overflowX: "scroll" }}
            >
              <div className="flex items-center gap-[2px] min-w-[80px]">
                <h3 className="font-[600]">Filter:</h3>
                <h3 className="font-[600]">({feedbackStats?.filteredCount})</h3>
              </div>
              <div className="w-full flex items-center gap-2">
                <div
                  onClick={() => setFilter("all")}
                  className="rounded-md font-[600] p-4 py-1 cursor-pointer  text-center"
                  style={{
                    background:
                      filter === "all"
                        ? "linear-gradient(45deg, rgba(0, 183, 255, 1) 0%, rgba(180, 87, 199, 1) 50%, rgba(237, 209, 83, 1) 100%)"
                        : "#e5e5e5",
                    color: filter === "all" ? "white" : "#111",
                  }}
                >
                  {activeLanguage.all}
                </div>
                <div
                  onClick={() => setFilter("stars")}
                  className="rounded-md font-[600] p-4 py-1 cursor-pointer  text-center"
                  style={{
                    background:
                      filter === "stars"
                        ? "linear-gradient(45deg, rgba(0, 183, 255, 1) 0%, rgba(180, 87, 199, 1) 50%, rgba(237, 209, 83, 1) 100%)"
                        : "#e5e5e5",
                    color: filter === "stars" ? "white" : "#111",
                  }}
                >
                  {activeLanguage.stars}
                </div>
                <div
                  onClick={() => setFilter("emojy")}
                  className="rounded-md font-[600] p-4 py-1 cursor-pointer  text-center"
                  style={{
                    background:
                      filter === "emojy"
                        ? "linear-gradient(45deg, rgba(0, 183, 255, 1) 0%, rgba(180, 87, 199, 1) 50%, rgba(237, 209, 83, 1) 100%)"
                        : "#e5e5e5",
                    color: filter === "emojy" ? "white" : "#111",
                  }}
                >
                  {activeLanguage.emojies}
                </div>
                <div
                  onClick={() => setFilter("comment")}
                  className="rounded-md font-[600] p-4 py-1 cursor-pointer  text-center"
                  style={{
                    background:
                      filter === "comment"
                        ? "linear-gradient(45deg, rgba(0, 183, 255, 1) 0%, rgba(180, 87, 199, 1) 50%, rgba(237, 209, 83, 1) 100%)"
                        : "#e5e5e5",
                    color: filter === "comment" ? "white" : "#111",
                  }}
                >
                  {activeLanguage.comments}
                </div>
                <div
                  onClick={() => setFilter("today")}
                  className="rounded-md font-[600] p-4 py-1 cursor-pointer  text-center"
                  style={{
                    background:
                      filter === "today"
                        ? "linear-gradient(45deg, rgba(0, 183, 255, 1) 0%, rgba(180, 87, 199, 1) 50%, rgba(237, 209, 83, 1) 100%)"
                        : "#e5e5e5",
                    color: filter === "today" ? "white" : "#111",
                  }}
                >
                  {activeLanguage.Today}
                </div>
              </div>
            </div>
            <div className="w-full desktop:h-[650px] relative overflow-hidden">
              {confirm && (
                <div
                  className="fixed bottom-0 desktop:bottom-auto desktop:absolute rounded-xl z-10 w-full h-[300px] desktop:h-full flex flex-col items-center justify-center px-6 desktop:p-4"
                  style={{
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                  }}
                >
                  <div className="flex flex-col gap-4 desktop:gap-6 w-full desktop:w-2/3 items-center">
                    <h3>{activeLanguage?.areYouSure}</h3>
                    <div className="w-full flex items-center justify-evenly gap-4 desktop:gap-4">
                      <div className="w-full h-10">
                        <Button
                          title="Cancel"
                          background="#b9b9b9"
                          color="white"
                          onClick={() => setConfirm(false)}
                        />
                      </div>
                      <div className="w-full h-10">
                        <Button
                          title="Delete"
                          background="green"
                          color="white"
                          onClick={() => DeleteFeedback({ id: confirm })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="w-full h-[60vh] desktop:h-[70vh] relative overflow-y-auto border flex flex-col rounded-xl p-2 desktop:p-4 gap-2"
              >
                {feedbackStats?.feedbacks.map((fb: any) => (
                  <div
                    onClick={() => {
                      if (fb.status === "unread") {
                        return ReadFeedback({ id: fb._id });
                      }
                    }}
                    key={fb._id}
                    className="border rounded-xl px-3 desktop:px-4 py-3 flex flex items-center justify-between gap-1 text-sm  cursor-pointer"
                    style={{
                      background:
                        fb.status === "unread"
                          ? "linear-gradient(45deg, rgba(0, 183, 255, 1) 0%, rgba(180, 87, 199, 1) 50%, rgba(237, 209, 83, 1) 100%)"
                          : "transparent",
                      transition: "ease-in 200ms",
                    }}
                  >
                    <div className="flex flex-col gap-2 w-[100%]">
                      <div className="bg-[#f1f1f1] p-2 px-4 rounded-full w-full flex items-center justify-between">
                        {fb.createdAt && (
                          <p
                            className="text-xs text-gray font-[600] "
                            style={{
                              color: "#111",
                            }}
                          >
                            {FormatDate(new Date(fb.createdAt).toString(), "")}
                          </p>
                        )}
                        {fb.status === "read" && (
                          <MdDelete
                            size={20}
                            onClick={() => setConfirm(fb._id)}
                            className="hover:text-[red] text-[#b9b9b9]"
                          />
                        )}
                      </div>
                      {fb.stars && (
                        <p
                          style={{
                            color: fb.status === "unread" ? "white" : "#111",
                          }}
                        >
                          ⭐ {activeLanguage.stars}:{" "}
                          <strong
                            style={{
                              color: fb.status === "unread" ? "white" : "#111",
                            }}
                          >
                            {fb.stars}
                          </strong>
                        </p>
                      )}
                      {fb.emojy && (
                        <div className="flex items-center gap-2">
                          {fb.emojy === "like" ? (
                            <AiFillDislike
                              size={14}
                              color="blue"
                              style={{
                                cursor: "pointer",
                                transition: "ease-in 200ms",
                                transform: "rotate(180deg)",
                              }}
                              className="hover:scale-[1.3]"
                            />
                          ) : fb.emojy === "dislike" ? (
                            <AiFillDislike
                              size={14}
                              color="red"
                              style={{
                                cursor: "pointer",
                                transition: "ease-in 200ms",
                              }}
                              className="hover:scale-[1.3]"
                            />
                          ) : fb.emojy === "happy" ? (
                            <FaFaceGrinStars
                              size={14}
                              color="yellow"
                              style={{
                                cursor: "pointer",
                                transition: "ease-in 200ms",
                              }}
                              className="hover:scale-[1.3]"
                            />
                          ) : fb.emojy === "heart" ? (
                            <FaHeart
                              size={14}
                              color="red"
                              style={{
                                cursor: "pointer",
                                transition: "ease-in 200ms",
                              }}
                              className="hover:scale-[1.3]"
                            />
                          ) : (
                            <FaAngry
                              size={14}
                              color="red"
                              style={{
                                cursor: "pointer",
                                transition: "ease-in 200ms",
                              }}
                              className="hover:scale-[1.3]"
                            />
                          )}
                          <p
                            style={{
                              color: fb.status === "unread" ? "white" : "#111",
                            }}
                          >
                            {activeLanguage.emojy}: <strong>{fb.emojy}</strong>
                          </p>
                        </div>
                      )}
                      {fb.comment && (
                        <p
                          style={{
                            color: fb.status === "unread" ? "white" : "#111",
                          }}
                          className="w-full overflow-hidden"
                        >
                          💬 {activeLanguage.comment}:{" "}
                          <strong
                            style={{
                              color: fb.status === "unread" ? "white" : "#111",
                            }}
                          >
                            {fb.comment}
                          </strong>
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {feedbackStats?.feedbacks.length === 0 && (
                  <div className="text-center text-gray-400 mt-4">
                    No feedbacks yet
                  </div>
                )}
              </div>
            </div>
          </div>
          {!isMobile && (
            <div className="w-1/2 border rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-4 w-full">
                <h2 className="font-[600] ">
                  {activeLanguage.totalEmojies}: ({feedbackStats?.emojiCount})
                </h2>
                <div className="flex items-center gap-2">
                  {feedbackStats?.emojiBreakdown
                    .sort((a: any, b: any) => {
                      if (a.count === b.count) {
                        return a.emojy.localeCompare(b.emojy); // ანბანის მიხედვით
                      }
                      return b.count - a.count; // კლებადობით
                    })
                    .map((i: any) => {
                      return (
                        <div key={i.emojy} className="flex items-center gap-1">
                          {i.emojy === "like" ? (
                            <AiFillDislike
                              size={14}
                              color="blue"
                              style={{
                                cursor: "pointer",
                                transition: "ease-in 200ms",
                                transform: "rotate(180deg)",
                              }}
                              className="hover:scale-[1.3]"
                            />
                          ) : i.emojy === "dislike" ? (
                            <AiFillDislike
                              size={14}
                              color="red"
                              style={{
                                cursor: "pointer",
                                transition: "ease-in 200ms",
                              }}
                              className="hover:scale-[1.3]"
                            />
                          ) : i.emojy === "happy" ? (
                            <FaFaceGrinStars
                              size={14}
                              color="orange"
                              style={{
                                cursor: "pointer",
                                transition: "ease-in 200ms",
                              }}
                              className="hover:scale-[1.3]"
                            />
                          ) : i.emojy === "heart" ? (
                            <FaHeart
                              size={14}
                              color="red"
                              style={{
                                cursor: "pointer",
                                transition: "ease-in 200ms",
                              }}
                              className="hover:scale-[1.3]"
                            />
                          ) : (
                            <FaAngry
                              size={14}
                              color="red"
                              style={{
                                cursor: "pointer",
                                transition: "ease-in 200ms",
                              }}
                              className="hover:scale-[1.3]"
                            />
                          )}
                          {i.count}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="flex items-center gap-4 font-[600]">
                <h2 className="font-[600] ">
                  {activeLanguage.totalGivenStars}: ({feedbackStats?.starsCount}
                  )
                </h2>
                <Rating
                  name="text-feedback"
                  value={feedbackStats?.starsAvg}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {feedbackStats?.starsAvg.toFixed(2)}
              </div>
              <h2 className="font-[600] ">
                {activeLanguage.totalComments}: ({feedbackStats?.commentCount})
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
