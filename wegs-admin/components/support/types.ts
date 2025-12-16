export interface Ticket {
    id: string;
    subject: string;
    customerName: string;
    customerEmail: string;
    status: "open" | "in-progress" | "resolved" | "closed";
    priority: "low" | "normal" | "high" | "critical";
    createdAt: string;
    lastUpdated: string;
    category: string;
    messages: {
        id: string;
        sender: "customer" | "support";
        message: string;
        timestamp: string;
    }[];
}
