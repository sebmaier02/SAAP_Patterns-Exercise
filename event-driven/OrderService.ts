import { eventBus } from "./EventBus";
import { Order } from "../shared/types";

let orderCounter = 0;

export function placeOrder(items: string[]): Order {
  const order: Order = {
    id: String(++orderCounter),
    items,
    status: "placed",
    timestamp: new Date(),
  };
  eventBus.publish({ type: "OrderPlaced", order });
  return order;
}

export function markOrderReady(order: Order): void {
  order.status = "ready";
  eventBus.publish({ type: "OrderReady", order });
}

export function cancelOrder(order: Order): void {
  order.status = "cancelled";
  eventBus.publish({ type: "OrderCancelled", order });
}

