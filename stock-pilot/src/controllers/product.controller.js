import { createProducts } from "../models/product.model.js";

export async function createProduct(req, res) {
	const data = await createProducts(req.body);
	res.status(201).json({ message: "product created successfully", data });
}
