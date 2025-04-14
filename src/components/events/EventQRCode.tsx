import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { DownloadIcon } from "@heroicons/react/24/outline";

interface EventQRCodeProps {
  eventId: string;
  eventName: string;
}

export default function EventQRCode({ eventId, eventName }: EventQRCodeProps) {
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    // Generate the URL for the event
    const eventUrl = `${window.location.origin}/events/${eventId}/tickets`;
    setQrValue(eventUrl);
  }, [eventId]);

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${eventName}-ticket-qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Event QR Code
      </h3>
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-white rounded-lg">
          <QRCode
            id="qr-code"
            value={qrValue}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Scan this QR code to register or purchase tickets
        </p>
        <button
          onClick={downloadQRCode}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <DownloadIcon className="h-5 w-5 mr-2" />
          Download QR Code
        </button>
      </div>
    </div>
  );
}
