import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

interface PaymentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  amount: number;
  eventTitle: string;
  quantity: number;
  email: string;
}

interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export default function PaymentModal({
  isOpen,
  closeModal,
  amount,
  eventTitle,
  quantity,
  email,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState("paystack");
  const [showTransferDetails, setShowTransferDetails] = useState(false);
  const [showUSSDDetails, setShowUSSDDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Add Paystack Script
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const bankDetails: BankDetails = {
    bankName: "Guaranty Trust Bank",
    accountNumber: "0123456789",
    accountName: "Campus Events Hub",
  };

  const ussdCodes = {
    gtb: "*737*1*",
    firstBank: "*894*1*",
    zenith: "*966*1*",
  };

  const handlePaystackPayment = () => {
    if (typeof window.PaystackPop !== "undefined") {
      const handler = window.PaystackPop.setup({
        key:
          process.env.REACT_APP_PAYSTACK_PUBLIC_KEY ||
          "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        email: email,
        amount: amount * 100, // Convert to kobo
        currency: "NGN",
        ref: new Date().getTime().toString(),
        onClose: () => {
          console.log("Payment cancelled");
        },
        callback: (response: any) => {
          console.log("Payment successful:", response);
          closeModal();
        },
      });
      handler.openIframe();
    } else {
      console.error("Paystack script not loaded");
      alert("Payment system is currently unavailable. Please try again later.");
    }
  };

  const handleCopyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(bankDetails.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handlePayment = () => {
    switch (selectedMethod) {
      case "paystack":
        handlePaystackPayment();
        break;
      case "transfer":
        setShowTransferDetails(true);
        setShowUSSDDetails(false);
        break;
      case "ussd":
        setShowUSSDDetails(true);
        setShowTransferDetails(false);
        break;
      default:
        break;
    }
  };

  const renderTransferDetails = () => (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
        Bank Transfer Details
      </h4>
      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Bank: {bankDetails.bankName}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Account Number: {bankDetails.accountNumber}
          </p>
          <button
            onClick={handleCopyAccountNumber}
            className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
          >
            <ClipboardDocumentIcon className="h-4 w-4" />
            <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Account Name: {bankDetails.accountName}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Amount: ₦{amount.toLocaleString()}
        </p>
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Please include your email address as reference when making the
          transfer. Your ticket will be generated once payment is confirmed.
        </p>
      </div>
    </div>
  );

  const renderUSSDDetails = () => (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
        USSD Payment Instructions
      </h4>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GTBank
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Dial: {ussdCodes.gtb}
            {amount}#
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Bank
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Dial: {ussdCodes.firstBank}
            {amount}#
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Zenith Bank
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Dial: {ussdCodes.zenith}
            {amount}#
          </p>
        </div>
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Follow the prompts to complete your payment. Your ticket will be
          generated once payment is confirmed.
        </p>
      </div>
    </div>
  );

  const paymentMethods = [
    {
      id: "paystack",
      name: "Pay with Card",
      description: "Secure payment via Paystack",
      icon: "💳",
    },
    {
      id: "transfer",
      name: "Bank Transfer",
      description: "Pay via bank transfer",
      icon: "🏦",
    },
    {
      id: "ussd",
      name: "USSD",
      description: "Pay using USSD code",
      icon: "📱",
    },
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex justify-between items-center"
                >
                  <span>Payment for {eventTitle}</span>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <div className="mt-4">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Quantity: {quantity} ticket(s)
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total: ₦{amount.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedMethod === method.id
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-primary-500"
                        }`}
                        onClick={() => {
                          setSelectedMethod(method.id);
                          setShowTransferDetails(false);
                          setShowUSSDDetails(false);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {method.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {showTransferDetails && renderTransferDetails()}
                  {showUSSDDetails && renderUSSDDetails()}

                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      onClick={handlePayment}
                    >
                      {selectedMethod === "paystack"
                        ? `Pay ₦${amount.toLocaleString()}`
                        : "Show Payment Details"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
