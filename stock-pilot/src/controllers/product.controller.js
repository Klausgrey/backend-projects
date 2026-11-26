import {
	createProducts,
	getProducts,
	getProductById,
	updateProductDetails,
	getProductsLowStocks,
} from "../models/product.model.js";

export async function createProduct(req, res) {
	// console.log(req.body);
	const data = await createProducts(req.body);
	res.status(201).json({ message: "product created successfully", data });
}

export async function getProduct(req, res) {
	const data = await getProducts(req.query);
	res.status(200).json({ message: "product gotten successfully", data });
}

export async function getProductId(req, res) {
	const data = await getProductById(req.params.id);
	res.status(200).json({ message: "product with the id", data });
}

export async function updateProductDetail(req, res) {
	const data = await updateProductDetails(req.params.id, req.body);
	res.status(201).json({ message: "updated values", data });
}

export async function getProductsLowStock(_req, res) {
	const data = await getProductsLowStocks();
	res.status(201).json({ message: "stocks with quantities less than 5", data });
}
