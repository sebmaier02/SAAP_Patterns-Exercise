import { OrderEvent, EventType } from "../shared/types";

type Subscriber = (event: OrderEvent) => void;

class EventBus {
  private subscribers: Map<EventType, Subscriber[]> = new Map();

  subscribe(eventType: EventType, callback: Subscriber): void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType)!.push(callback);
  }

  publish(event: OrderEvent): void {
    console.log(`[EventBus] Publishing: ${event.type}`);
    const subs = this.subscribers.get(event.type) || [];
    subs.forEach((callback) => callback(event));
  }
}

export const eventBus = new EventBus();

