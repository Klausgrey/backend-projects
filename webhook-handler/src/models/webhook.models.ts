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


