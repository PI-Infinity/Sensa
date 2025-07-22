"use client";
import { useAppContext } from "@/context/app";
import Header from "./header";
import { Menu } from "./menu";
import { useEffect, useState } from "react";
import { Customize } from "./states/customize";
import { Feedbacks } from "./states/feedbacks";
import { CreateQR } from "./states/createQR";
import { MdClose } from "react-icons/md";

const Dashboard = () => {
  const { isMobile, loading, userData, setUserData } = useAppContext();
  const [activeState, setActiveState] = useState("feedbacks");

  const [loadDatta, setLoadData] = useState(true);

  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div
      className="w-full desktop:h-[100vh] flex-col"
      style={{
        display: loading ? "none" : "flex",
      }}
    >
      <div className="h-16">
        <Header setOpenMenu={setOpenMenu} />
      </div>
      <div className="w-full h-full flex">
        {!isMobile && (
          <Menu
            activeState={activeState}
            setActiveState={setActiveState}
            userData={userData}
            setOpenMenu={setOpenMenu}
          />
        )}
        {isMobile && openMenu && (
          <div
            className="fixed top-0 z-[10] w-full h-[100vh]"
            style={{
              WebkitBackdropFilter: "blure(10px)",
              backdropFilter: "blur(20px)",
            }}
          >
            <MdClose
              size={32}
              className="absolute right-5 top-4 cursor-pointer"
              onClick={() => setOpenMenu(false)}
            />
            <Menu
              activeState={activeState}
              setActiveState={setActiveState}
              userData={userData}
              setOpenMenu={setOpenMenu}
            />
          </div>
        )}
        <div className="w-full desktop:w-[85%]">
          {activeState === "customize" ? (
            <Customize data={userData} setData={setUserData} />
          ) : activeState === "feedbacks" ? (
            <Feedbacks data={userData} setData={setUserData} />
          ) : activeState === "create_qr" ? (
            <CreateQR data={userData} setData={setUserData} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
