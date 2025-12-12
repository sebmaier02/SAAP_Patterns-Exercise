import { createServer, IncomingMessage, ServerResponse } from "http";
import { Order, OrderStatus } from "../shared/types";

const orders: Map<string, Order> = new Map();
let orderCounter = 0;

function parseBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk: Buffer) => (body += chunk));
    req.on("end", () => resolve(body));
  });
}

function sendJson(res: ServerResponse, data: unknown, status = 200): void {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || "/";
  const method = req.method || "GET";

  // GET /orders - List all orders
  if (method === "GET" && url === "/orders") {
    console.log("[Server] GET /orders");
    return sendJson(res, Array.from(orders.values()));
  }

  // POST /orders - Create new order
  if (method === "POST" && url === "/orders") {
    const body = JSON.parse(await parseBody(req));
    const order: Order = {
      id: String(++orderCounter),
      items: body.items,
      status: "placed",
      timestamp: new Date(),
    };
    orders.set(order.id, order);
    console.log(`[Server] POST /orders -> Created #${order.id}`);
    return sendJson(res, order, 201);
  }

  // PATCH /orders/:id - Update order status
  if (method === "PATCH" && url.startsWith("/orders/")) {
    const id = url.split("/")[2];
    const order = orders.get(id);
    if (!order) return sendJson(res, { error: "Not found" }, 404);

    const body = JSON.parse(await parseBody(req));
    order.status = body.status as OrderStatus;
    console.log(`[Server] PATCH /orders/${id} -> Status: ${order.status}`);
    return sendJson(res, order);
  }

  sendJson(res, { error: "Not found" }, 404);
}

export function startServer(port = 3000): void {
  createServer(handleRequest).listen(port, () => {
    console.log(`[Server] Running on http://localhost:${port}`);
  });
}

