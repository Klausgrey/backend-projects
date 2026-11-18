import {
	createCategories,
	getAllCategories,
} from "../models/categories.model.js";

export async function createCategory(req, res) {
	const { name, description } = req.body;
	const data = await createCategories(name, description);
	res
		.status(201)
		.json({ message: `${name} category created successfully`, data });
}

export async function getAllCategory(req, res) {
	const data = await getAllCategories();
	res.status(200).json({ message: "all the categories", data });
}
