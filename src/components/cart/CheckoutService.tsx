// src/services/checkoutService.ts
import { OrderRequestDTO, OrderResponseDTO } from "../../typed/Product"; // adjust path

export async function checkoutOrder(
  orderRequest: OrderRequestDTO
): Promise<OrderResponseDTO> {
  const response = await fetch("http://localhost:8081/api/orders/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderRequest),
  });

  if (!response.ok) {
    throw new Error("Checkout request failed");
  }

  return await response.json();
}
