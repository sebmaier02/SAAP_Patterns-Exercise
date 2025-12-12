import { startServer } from "./Server";
import { createOrder, updateOrderStatus, getOrders } from "./Client";

console.log("=== CLIENT-SERVER ARCHITECTURE (REST) ===\n");

// Start server
startServer(3000);

// Simulate client actions after server starts
setTimeout(async () => {
  console.log("\n--- Simulating Order Flow ---\n");

  // Create orders via REST
  const order1 = await createOrder(["Pizza", "Cola"]);
  const order2 = await createOrder(["Burger", "Fries"]);

  // Update status via REST
  await updateOrderStatus(order1.id, "ready");
  await updateOrderStatus(order2.id, "cancelled");

  // Kitchen must manually fetch to see current state (no push!)
  console.log("\n[Kitchen] Fetching current orders (manual refresh)...");
  const orders = await getOrders();
  console.log("[Kitchen] Current orders:", orders.map((o) => `#${o.id}:${o.status}`).join(", "));

  process.exit(0);
}, 500);