import pool from "./db.js";

async function testConnection() {
	try {
		const {
			rows: [result],
		} = await pool.query(`
      SELECT
        current_database() AS database_name,
        NOW() AS server_time
    `);

		console.log("Database connected successfully!");
		console.log(result);
	} catch (error) {
		console.error("Database connection failed:", error.message);
	} finally {
		await pool.end();
	}
}

testConnection();
