import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleScan = (result: any) => {
    if (result) {
      try {
        const url = new URL(result);
        const path = url.pathname;
        // Extract event ID from the path
        const eventId = path.split("/")[2];
        if (eventId) {
          navigate(`/events/${eventId}/tickets`);
        } else {
          setError("Invalid QR code. Please scan a valid event QR code.");
        }
      } catch (err) {
        setError("Invalid QR code. Please scan a valid event QR code.");
      }
    }
  };

  const handleError = (err: any) => {
    setError("Error scanning QR code. Please try again.");
    console.error(err);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Scan Event QR Code
          </h3>
          <button
            onClick={() => setScanning(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/50 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="relative aspect-square w-full">
          {scanning ? (
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={handleScan}
              onError={handleError}
              className="w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Click the button below to start scanning
              </p>
              <button
                onClick={() => setScanning(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Start Scanning
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
