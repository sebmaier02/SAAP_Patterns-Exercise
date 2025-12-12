import { eventBus } from "./EventBus";
import { OrderEvent } from "../shared/types";

// Customer UI - subscribes to order status updates
export function initCustomerUI(): void {
  eventBus.subscribe("OrderPlaced", (event: OrderEvent) => {
    console.log(`[UI] ✅ Order #${event.order.id} confirmed`);
  });

  eventBus.subscribe("OrderReady", (event: OrderEvent) => {
    console.log(`[UI] 🔔 Order #${event.order.id} is ready for pickup!`);
  });

  eventBus.subscribe("OrderCancelled", (event: OrderEvent) => {
    console.log(`[UI] ❌ Order #${event.order.id} was cancelled`);
  });

  console.log("[UI] Customer display initialized, listening for events...");
}

