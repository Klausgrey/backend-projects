import pool from "../config/db.js";
import { fail } from "../helpers/errors.js";

export async function createSuppliers({ name, email, phone, address }) {
	const {
		rows: [isExisiting],
	} = await pool.query(
		`
	select *
	from suppliers
	where email = $1 and phone = $2
		`,
		[email, phone],
	);

	if (isExisiting)
		fail("This supplier witht this email and phone number already exists", 409);

	const {
		rows: [supplier],
	} = await pool.query(`
		insert into suppliers (name, email, phone, address)
		values ($1, $2, $3, $4)
		returning *
		`);

	return supplier;
}

export async function getSuppliers() {
	const { rows } = await pool.query(`
		select *
	from suppliers
	order by desc
		`);

	return rows;
}
