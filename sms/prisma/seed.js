import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
	const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
	const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;
	if (!superAdminEmail || !superAdminPassword) {
		console.log("super admin email and password should be provided");
		return;
	}

	const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

	await prisma.user.upsert({
		where: { email: superAdminEmail },
		update: { role: "SUPER_ADMIN", hashedPassword },
		create: {
			email: superAdminEmail,
			hashedPassword: hashedPassword,
			firstName: "super",
			lastName: "admin",
			role: "SUPER_ADMIN",
		},
	});

	console.log("super-admin seeded successfully");
}

main()
	.catch((err) => {
		console.error(err);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
