import React, { createContext, useContext, useState } from "react";
import {
  TicketTier,
  PaymentTransaction,
  RefundRequest,
  FinancialReport,
  TicketTransfer,
} from "../types/payment";

interface PaymentContextType {
  ticketTiers: TicketTier[];
  transactions: PaymentTransaction[];
  refundRequests: RefundRequest[];
  financialReports: FinancialReport[];
  ticketTransfers: TicketTransfer[];
  loading: boolean;
  error: string | null;
  createTicketTier: (tier: Omit<TicketTier, "id">) => Promise<void>;
  processPayment: (
    transaction: Omit<PaymentTransaction, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  requestRefund: (
    request: Omit<RefundRequest, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  generateFinancialReport: (
    eventId: string,
    period: { start: Date; end: Date }
  ) => Promise<void>;
  transferTicket: (
    transfer: Omit<TicketTransfer, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([]);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([]);
  const [financialReports, setFinancialReports] = useState<FinancialReport[]>(
    []
  );
  const [ticketTransfers, setTicketTransfers] = useState<TicketTransfer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTicketTier = async (tier: Omit<TicketTier, "id">) => {
    try {
      setLoading(true);
      // TODO: Implement API call to create ticket tier
      // const response = await api.post('/ticket-tiers', tier);
      // setTicketTiers(prev => [...prev, response.data]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create ticket tier"
      );
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async (
    transaction: Omit<PaymentTransaction, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setLoading(true);
      // TODO: Implement payment gateway integration
      // const response = await api.post('/transactions', transaction);
      // setTransactions(prev => [...prev, response.data]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to process payment"
      );
    } finally {
      setLoading(false);
    }
  };

  const requestRefund = async (
    request: Omit<RefundRequest, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setLoading(true);
      // TODO: Implement API call to request refund
      // const response = await api.post('/refund-requests', request);
      // setRefundRequests(prev => [...prev, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request refund");
    } finally {
      setLoading(false);
    }
  };

  const generateFinancialReport = async (
    eventId: string,
    period: { start: Date; end: Date }
  ) => {
    try {
      setLoading(true);
      // TODO: Implement API call to generate financial report
      // const response = await api.get(`/financial-reports/${eventId}`, { params: period });
      // setFinancialReports(prev => [...prev, response.data]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate financial report"
      );
    } finally {
      setLoading(false);
    }
  };

  const transferTicket = async (
    transfer: Omit<TicketTransfer, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setLoading(true);
      // TODO: Implement API call to transfer ticket
      // const response = await api.post('/ticket-transfers', transfer);
      // setTicketTransfers(prev => [...prev, response.data]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to transfer ticket"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        ticketTiers,
        transactions,
        refundRequests,
        financialReports,
        ticketTransfers,
        loading,
        error,
        createTicketTier,
        processPayment,
        requestRefund,
        generateFinancialReport,
        transferTicket,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
