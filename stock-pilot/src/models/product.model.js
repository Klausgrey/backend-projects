import pool from "../config/db.js";
import { randomBytes } from "node:crypto";

function generateSku() {
	return ``;
}

export async function createProducts(
	name,
	categoryId,
	description,
	brand,
	variants,
) {
	const admin = await pool.connect();

	try {
		await admin.query("BEGIN");
		const {
			rows: [product],
		} = await admin.query(
			sql`
		insert into products (name, category_id, description, brand)
		values ($1,$2,$3,$4,)
		returning *
			`,
			[name, categoryId, description ?? null, brand ?? null],
		);

		const createVariants = [];
		for (const variant of variants) {
			const sku = generateSku({
				name: product.name,
				brand: product.brand,
				attributes: variant.attributes,
				sequence: "",
			});

			const {
				rows: [createVariant],
			} = await admin.query(
				sql`
			insert into product_variant (product_id, sku, attributes, cost_price, selling_price, stock_quantity, reorder_level)
			values ($1,$2,$3,$4,$5,$6)
			returning *
			`,
				[
					product.id,
					variant.sku,
					JSON.stringify(variant.attributes),
					variant.costprice,
					variant.sellingPrice,
					variant.reorderStock,
				],
			);

			createVariants.push(createVariant);
		}
		await admin.query("COMMIT");
		return { ...product, createVariants };
	} catch (error) {
		await admin.query("ROLLBACK");
		throw error;
	} finally {
		admin.release();
	}
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
