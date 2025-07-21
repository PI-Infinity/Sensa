import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { usePathname } from "next/navigation";

export default function QRCodeGenerator({ userId }: any) {
  const [qrUrl, setQrUrl] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const fullUrl = `https://c606-188-123-138-189.ngrok-free.app/en/qr?userId=${userId}`; // Production domain
    QRCode.toDataURL(fullUrl)
      .then((url) => setQrUrl(url))
      .catch((err) => console.error(err));
  }, [pathname]);

  return qrUrl ? (
    <img src={qrUrl} alt="QR Code" height={200} width={200} />
  ) : (
    <p>Loading QR...</p>
  );
}
