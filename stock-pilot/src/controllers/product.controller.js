import { createProducts, getProducts } from "../models/product.model.js";

export async function createProduct(req, res) {
	// console.log(req.body);
	const data = await createProducts(req.body);
	res.status(201).json({ message: "product created successfully", data });
}

export async function getProduct(req, res) {
	const data = await getProducts(req.query);
	res.status(200).json({ message: "product gotten successfully", data });
}
