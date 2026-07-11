import {
	createWebhook,
	getAllWebhooks,
	getWebhookById,
} from "../models/webhook.models.js";
import { Request, Response, NextFunction } from "express";

export const receiveWebhook = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { event, payload, source, verified } = req.body;
	try {
		const result = await createWebhook(event, payload, source, verified);
		res.status(201).json({ result });
	} catch (err) {
		next(err);
	}
};

export const getAll = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data = await getAllWebhooks();
		res.status(200).json({ data });
	} catch (err) {
		next(err);
	}
};

export const getAllById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = Number(req.params.id);
	try {
		const data = await getWebhookById(id);
		res.status(200).json({ data });
	} catch (err) {
		next(err);
	}
};
