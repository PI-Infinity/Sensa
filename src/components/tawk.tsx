"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Tawk = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/qr")) return;

    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/685820dcb88d9b190d738fd1/1iuc40ne2";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    document.body.appendChild(s1);

    return () => {
      document.body.removeChild(s1);
    };
  }, [pathname]);

  return null;
};

export default Tawk;
