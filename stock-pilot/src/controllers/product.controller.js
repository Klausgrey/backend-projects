import { createProducts } from "../models/product.model.js";

export async function createProduct(req, res) {
	console.log(req.body);
	const data = await createProducts(req.body);
	res.status(201).json({ message: "product created successfully", data });
}
