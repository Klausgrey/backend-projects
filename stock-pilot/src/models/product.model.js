import pool from "../config/db.js";
import { randomBytes } from "node:crypto";

function generateSku() {
	return ``
}

export async function createProducts(
	name,
	categoryId,
	description,
	costPrice,
	sellingPrice,
	reorderLevel,
) {
	const {
		rows: [product],
	} = await pool.query(
		sql`
	insert into products (name, sku, category_id, costPrice, description)
	values ($1,$2,$3,$4,$5)
		`,
		[name, sku, categoryId, costPrice, description],
	);
}

// {
// 	"name": "Samsung Galaxy A15",
// 	"sku": "SAM-A15-001",
// 	"categoryId": "category-uuid",
// 	"description": "Samsung smartphone",
// 	"costPrice": 150000,
// 	"sellingPrice": 185000,
// 	"reorderLevel": 5
// }
