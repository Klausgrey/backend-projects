import { prisma } from "../config/db.js";

export const createWebhook = async (
	event: string,
	payload: object,
	source: string,
	verified: boolean,
) => {
	return await prisma.webhook.create({
		data: {
			event,
			payload,
			source,
			verified,
		},
	});
};

export const getAllWebhooks = async () => {
	return await prisma.webhook.findMany();
};

export const getWebhookById = async (id: number) => {
	return await prisma.webhook.findUnique({
		where: { id },
	});
};
