import pool from "../config/db.js";
import { fail } from "../helpers/errors.js";

function generateSku({ brand, name, attributes = {}, sequence }) {
	const brandCode = brand ? brand.trim().slice(0, 3).toUpperCase() : "GEN";

	const productWord = name
		.trim()
		.toUpperCase()
		.split(/[\s-]+/)
		.filter(Boolean);

	// if (productCode.length > 1) {
	// 	const productCode = productCode.slice(-2);
	// 	const prod = lastTwoWords
	// 		.map((letter) => letter.slice(0, 2))
	// 		.join("");
	// 	lastTwoLetters.slice(0, 3);
	// } else {
	// 	productCode.slice[(0, 3)];
	// }

	const productCode =
		productWord.length > 1
			? productWord
					.slice(-2)
					.map((word) => word.slice(0, 2))
					.join("")
					.slice(0, 3)
			: productWord[0].slice(0, 3);
	const sizeCodes = {
		small: "S",
		large: "L",
		medium: "M",
		"extra large": "XL",
		"extra extra large": "XXL",
	};
	const colorCodes = {
		blue: "BLU",
		black: "BLK",
		white: "WHT",
		red: "RED",
		green: "GRN",
	};

	const color = attributes.color?.toLowerCase();
	const size = attributes.size?.toLowerCase();

	const colorCode = color
		? (colorCodes[color] ?? color.slice(0, 3).toUpperCase())
		: null;

	const sizeCode = size
		? (sizeCodes[size] ?? size.slice(0, 3).toUpperCase())
		: null;

	const number = String(sequence).padStart(6, "0");
	return [brandCode, productCode, colorCode, sizeCode, number]
		.filter(Boolean)
		.join("-");
}

// Test it at the end with brand "Nike", name "Running Shoes", colour "black", size "large" and sequence 42. By hand I'd expect NIK-RUN-BLA-LARGE-000042
export async function createProducts({
	name,
	categoryId,
	description,
	brand,
	variants,
}) {
	const admin = await pool.connect();

	try {
		await admin.query("BEGIN");
		const {
			rows: [product],
		} = await admin.query(
			`
		insert into products (name, category_id, description, brand)
		values ($1, $2, $3, $4)
		returning *
			`,
			[name, categoryId, description ?? null, brand ?? null],
		);

		const createVariants = [];
		for (const variant of variants) {
			const {
				rows: [next],
			} = await admin.query(`select nextval('product_sku_sequence') as number`);
			const sku = variant.sku?.trim()
				? variant.sku.trim()
				: generateSku({
						name: product.name,
						brand: product.brand,
						attributes: variant.attributes ?? null,
						sequence: next.number,
					});

			const {
				rows: [createVariant],
			} = await admin.query(
				`
			insert into product_variants (product_id, sku, attributes, cost_price, selling_price, stock_quantity, reorder_level)
			values ($1,$2,$3,$4,$5,$6, $7)
			returning *
			`,
				[
					product.id,
					sku,
					JSON.stringify(variant.attributes),
					variant.costPrice,
					variant.sellingPrice,
					variant.stockQuantity,
					variant.reorderLevel,
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

export async function getProducts({
	name,
	categoryId,
	brand,
	// sku,
	// color,
	// size,
	page,
	limit,
}) {
	// const filter = {};
	// if (name) filter.name = name;
	// if (categoryId) filter.categoryId = categoryId;
	// if (brand) filter.brand = brand;
	// if (color) filter.color = color;
	// if (size) filter.size = size;
	// if (sku) filter.sku = sku;

	// const page = pages ? parseInt(pages, 10) : 1;
	// const limit = limits ? parseInt(limits, 10) : 10;

	const pageNumber = Math.max(1, parseInt(page, 10) || 1);
	const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
	const skip = (pageNumber - 1) * pageSize;

	const { rows } = await pool.query(
		`
		select *
		from products
		where ($1::text is null or name ilike '%' || $1 || '%')
		and ($2::uuid is null or category_id = $2)
		and ($3::text is null or brand = $3)
		order by created_at desc
		limit $4 offset $5
		`,
		[name ?? null, categoryId ?? null, brand ?? null, pageSize, skip],
	);

	return rows;
}

export async function getProductById({ id }) {
	const {
		rows: [product],
	} = await pool.query(
		`
		select *
		from products
		where id = $1
		`,
		[id],
	);

	if (!product) fail("this product does not exists", 404);
	return product;
}

export async function updateProductDetails() {}
