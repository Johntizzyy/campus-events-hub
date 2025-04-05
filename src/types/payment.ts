export interface TicketTier {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  availableQuantity: number;
  benefits: string[];
  startDate: Date;
  endDate: Date;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  eventId: string;
  ticketTierId: string;
  amount: number;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: string;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RefundRequest {
  id: string;
  transactionId: string;
  userId: string;
  eventId: string;
  reason: string;
  status: "pending" | "approved" | "rejected" | "completed";
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialReport {
  id: string;
  eventId: string;
  organizerId: string;
  totalRevenue: number;
  totalTicketsSold: number;
  totalRefunds: number;
  netRevenue: number;
  period: {
    start: Date;
    end: Date;
  };
  ticketTierBreakdown: {
    tierId: string;
    quantitySold: number;
    revenue: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketTransfer {
  id: string;
  ticketId: string;
  fromUserId: string;
  toUserId: string;
  status: "pending" | "completed" | "cancelled";
  transferDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
