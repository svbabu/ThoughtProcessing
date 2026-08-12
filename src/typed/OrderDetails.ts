//OrderDetails.ts file
// GET /api/orders/:orderId
import express, { Request, Response } from "express";
import { pool } from "../db"; // adjust path to your db config

const router = express.Router();
type HistoryRow = {
  status: string;
  status_time: Date;
  remarks: string;
};
/*
router.get("/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
    const orderResult = await pool.query(
      `SELECT * FROM orders WHERE order_id = $1`,
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const historyResult = await pool.query(
      `SELECT status, status_time, remarks
       FROM order_history
       WHERE order_id = $1
       ORDER BY status_time`,
      [orderId]
    );

    res.json({
      ...orderResult.rows[0],
      timeline: historyResult.rows.map((row: HistoryRow) => ({
        status: row.status,
         statusTime: row.status_time,
        //date: row.status_time,
        remarks: row.remarks,
      })),
    });
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
 */
 router.get("/:orderId", async (req: Request, res: Response) => {
   const { orderId } = req.params;
   try {
     // Fetch order header
     const orderResult = await pool.query(
       `SELECT * FROM orders WHERE order_id = $1`,
       [orderId]
     );

     if (orderResult.rows.length === 0) {
       return res.status(404).json({ error: "Order not found" });
     }

     // Fetch order items
    const itemsResult = await pool.query(
      `SELECT
         product_id,
         product_name,
          model_name AS "modelName",
         description,
      image_url AS "imageUrl",
         quantity,
        price AS "price",
        base_price AS "basePrice",
       applied_price AS "appliedPrice",
          discount_percentage AS "discountPercentage",
        offer_id AS "offerId",
         mrp,
         discount
       FROM order_items
       WHERE order_id = $1`,
      [orderId]
    );


     // Fetch timeline
     const historyResult = await pool.query(
       `SELECT status, status_time, remarks
        FROM order_history
        WHERE order_id = $1
        ORDER BY status_time`,
       [orderId]
     );

     res.json({
       ...orderResult.rows[0],
       items: itemsResult.rows.map(item => ({
         productId: item.product_id,
         productName: item.product_name,
         modelName: item.model_name,
         description: item.description,
         imageUrl: item.image_url,
         quantity: item.quantity,              // ✅ make sure query selects this
         price: item.price,                    // alias item_price AS price in SQL
         basePrice: item.base_price,
         appliedPrice: item.applied_price,
         discountPercentage: item.discount_percentage, // ✅ if column exists
         offerId: item.offer_id,               // ✅ if column exists
         mrp: item.mrp,
         discount: item.discount
       })),
       timeline: historyResult.rows.map(row => ({
         status: row.status,
         date: row.status_time,
         remarks: row.remarks
       }))
     });
   } catch (err) {
     console.error("Error fetching order:", err);
     res.status(500).json({ error: "Internal server error" });
   }
 });


  export default router;