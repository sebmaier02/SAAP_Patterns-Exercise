import { eventBus } from "./EventBus";
import { OrderEvent } from "../shared/types";

// Kitchen Display - subscribes to order events
export function initKitchenDisplay(): void {
  eventBus.subscribe("OrderPlaced", (event: OrderEvent) => {
    console.log(`[Kitchen] 🍳 New order #${event.order.id}: ${event.order.items.join(", ")}`);
  });

  eventBus.subscribe("OrderCancelled", (event: OrderEvent) => {
    console.log(`[Kitchen] ❌ Order #${event.order.id} cancelled`);
  });

  console.log("[Kitchen] Display initialized, listening for events...");
}

