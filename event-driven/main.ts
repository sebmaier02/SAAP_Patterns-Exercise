import { initKitchenDisplay } from "./Kitchen";
import { initCustomerUI } from "./UI";
import { placeOrder, markOrderReady, cancelOrder } from "./OrderService";

console.log("=== EVENT-DRIVEN ARCHITECTURE ===\n");

// Initialize subscribers
initKitchenDisplay();
initCustomerUI();

console.log("\n--- Simulating Order Flow ---\n");

// Simulate order flow
const order1 = placeOrder(["Pizza", "Cola"]);
const order2 = placeOrder(["Burger", "Fries"]);

setTimeout(() => markOrderReady(order1), 100);
setTimeout(() => cancelOrder(order2), 200);

