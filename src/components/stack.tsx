"use client";

import { useAppContext } from "@/context/app";
import { usePathname } from "next/navigation";

const Stack = () => {
  // app context
  const { loading, theme } = useAppContext();

  const pathname = usePathname();

  // offers

  const offers = [
    { id: "weddings", label: "Weddings" },
    { id: "corporateEvents", label: "Corporate events" },
    { id: "presentations", label: "Company/product presentations" },
    { id: "conferences", label: "Conferences" },
    { id: "teambuildings", label: "Teambuildings" },
    { id: "festivalOrganizations", label: "Festival organization" },
  ];

  return (
    <div
      style={{
        color: theme.text,
        display: !pathname.includes("/projects/") ? "flex" : "none",
      }}
      className="flex-1 w-full items-center justify-center gap-2"
    >
      {/* <PageSwitcher /> */}
      <div
        style={{
          display: loading ? "none" : "flex",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        className="fixed bottom-3 desktop:bottom-4 w-[94%] desktop:w-[90%]
    border-[1px] border-[rgba(255,255,255,0.1)] rounded-full
    p-2 overflow-hidden flex items-center
    shadow-md
    "
      >
        <div className="flex logos">
          <div className="logos-slide">
            {offers.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="mx-12 flex items-center justify-center gap-4"
                >
                  <h4
                    className="font-custom font-[700]
              text-md whitespace-nowrap"
                  >
                    {item.label}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stack;
