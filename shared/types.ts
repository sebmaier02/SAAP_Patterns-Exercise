// Shared types for Food Order System

export interface Order {
  id: string;
  items: string[];
  status: OrderStatus;
  timestamp: Date;
}

export type OrderStatus = "placed" | "preparing" | "ready" | "cancelled";

export type EventType = "OrderPlaced" | "OrderReady" | "OrderCancelled";

export interface OrderEvent {
  type: EventType;
  order: Order;
}

