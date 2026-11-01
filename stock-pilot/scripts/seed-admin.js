import "dotenv/config";
import bcrypt from "bcrypt";
import { randomBytes } from "node:crypto";
import pool from "../src/config/db.js";

async function seedAdmin() {
	try {
		const firstName = process.env.SEED_ADMIN_FIRST_NAME;
		const lastName = process.env.SEED_ADMIN_LAST_NAME;
		const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();

		if (!firstName || !lastName || !email) {
			throw new Error("Admin seed environment variables are missing");
		}

		const password = randomBytes(18).toString("base64url");
		const passwordHash = await bcrypt.hash(password, 12);

		const {
			rows: [admin],
		} = await pool.query(
			`INSERT INTO users (
        first_name,
        last_name,
        email,
        password_hash,
        role
      )
      VALUES ($1, $2, $3, $4, 'admin')
      ON CONFLICT (email) DO NOTHING
      RETURNING id, first_name, last_name, email, role`,
			[firstName, lastName, email, passwordHash],
		);

		if (!admin) {
			console.log("An account with this email already exists.");
			return;
		}

		console.log("Admin created successfully!");
		console.log("User:", admin);
		console.log("Initial password:", password);
		console.log("Save this password securely. It won't be shown again.");
	} catch (error) {
		console.error("Failed to seed admin:", error.message);
		process.exitCode = 1;
	} finally {
		await pool.end();
	}
}

seedAdmin();
