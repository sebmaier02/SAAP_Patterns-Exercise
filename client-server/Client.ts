import { Order } from "../shared/types";

const BASE_URL = "http://localhost:3000";

async function request(path: string, options?: RequestInit): Promise<unknown> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  return res.json();
}

export async function createOrder(items: string[]): Promise<Order> {
  console.log(`[Client] Creating order: ${items.join(", ")}`);
  return request("/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  }) as Promise<Order>;
}

export async function getOrders(): Promise<Order[]> {
  console.log("[Client] Polling orders...");
  return request("/orders") as Promise<Order[]>;
}

export async function updateOrderStatus(id: string, status: string): Promise<Order> {
  console.log(`[Client] Updating order #${id} -> ${status}`);
  return request(`/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  }) as Promise<Order>;
}

// Simple polling mechanism for kitchen display
export function startPolling(intervalMs: number, callback: (orders: Order[]) => void): void {
  setInterval(async () => {
    const orders = await getOrders();
    callback(orders);
  }, intervalMs);
}

