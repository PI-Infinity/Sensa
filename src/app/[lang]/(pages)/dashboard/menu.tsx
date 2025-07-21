import { useAppContext } from "@/context/app";
import { FaRegGrinStars } from "react-icons/fa";
import { MdOutlineDashboardCustomize, MdQrCodeScanner } from "react-icons/md";

export const Menu = ({
  activeState,
  setActiveState,
  userData,
  setOpenMenu,
}: any) => {
  const { activeLanguage } = useAppContext();

  const menuItems = [
    {
      value: "feedbacks",
      label: activeLanguage.feedbacks,
      icon: <FaRegGrinStars />,
      badge: userData?.unreadFeedbacksCount,
    },
    {
      value: "customize",
      label: activeLanguage.customize,
      icon: <MdOutlineDashboardCustomize />,
    },
    // {
    //   value: "team",
    //   label: "Team",
    //   icon: <AiOutlineTeam />,
    // },
    // {
    //   value: "statistics",
    //   label: "Statistics",
    //   icon: <ImStatsBars />,
    // },
    // {
    //   value: "chats",
    //   label: "Chats",
    //   icon: <BsChatSquareHeart />,
    // },
    {
      value: "create_qr",
      label: "QR",
      icon: <MdQrCodeScanner />,
    },
    // {
    //   value: "location",
    //   label: "Locations",
    //   icon: <GrMapLocation />,
    // },
    // {
    //   value: "support",
    //   label: "Support",
    //   icon: <MdSupportAgent />,
    // },
  ];

  return (
    <div className="slide-in-right w-[83%] desktop:w-[15%] h-[100%] border-r px-6 py-4 flex flex-col gap-2 ">
      {menuItems?.map((i: any, x: number) => {
        return (
          <div
            onClick={() => {
              setActiveState(i.value);
              setOpenMenu(false);
            }}
            style={{
              padding: "4px 12px",
              borderRadius: 8,
              cursor: "pointer",
              transition: "ease-in 300ms",

              background:
                activeState === i.value
                  ? "linear-gradient(45deg, rgba(0, 183, 255, 1) 0%, rgba(180, 87, 199, 1) 50%, rgba(237, 209, 83, 1) 100%)"
                  : "#f1f1f1",
              color: activeState === i.value ? "white" : "#111",
              fontWeight: 600,
            }}
            className={`rounded-md flex items-center gap-2 text-white shadow-md transition duration-200 ${
              activeState === i.value ? "" : "bg-[#f1f1f1] text-black"
            } hover:brightness-110`}
            key={i.value}
          >
            {i.icon}
            {i.label}
            {i?.badge > 0 && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[red] text-white text-sm">
                {i.badge}
              </div>
            )}
          </div>
        );
      })}
      <span className="mt-auto">&copy; Copyright</span>
    </div>
  );
};
