import { startServer } from "./Server";
import { createOrder, updateOrderStatus, startPolling } from "./Client";

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

  // Start kitchen polling (every 2 seconds)
  console.log("\n[Kitchen] Starting polling every 2s...\n");
  startPolling(2000, (orders) => {
    console.log("[Kitchen] Current orders:", orders.map((o) => `#${o.id}:${o.status}`).join(", "));
  });
}, 500);

