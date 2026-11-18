import { createCategories } from "../models/categories.model.js";

export async function createCategory(req, res) {
	const { name, description } = req.body;
	const data = await createCategories(name, description);
	res
		.status(201)
		.json({ message: `${name} category created successfully`, data });
}
