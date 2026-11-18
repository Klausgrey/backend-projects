import {
	createCategories,
	getAllCategories,
	getCategoriesById,
	updateCategoriesById,
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

export async function getCategoryById(req, res) {
	const data = await getCategoriesById(req.params.id);
	res.status(200).json({ message: "category", data });
}

export async function updateCategoryById(req, res) {
	const { name, description } = req.body;
	const data = await updateCategoriesById(req.params.id, name, description);
	res.status(200).json({ message: "this is the updated category", data });
}
