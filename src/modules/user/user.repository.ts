import { pool } from "@/database/pgConnection";
import type { User } from "@/modules/user/user.model";

export class UserRepository {
	private mapDbRowToUser(row: any): User {
		return {
			id: row.id,
			name: row.name,
			email: row.email,
			createdAt: new Date(row.created_at),
			updatedAt: new Date(row.updated_at),
		};
	}

	async findAll(): Promise<User[]> {
		const result = await pool.query("SELECT * FROM users ORDER BY created_at DESC");
		return result.rows.map(row => this.mapDbRowToUser(row));
	}

	async findById(id: number): Promise<User | null> {
		const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
		return result.rows.length > 0 ? this.mapDbRowToUser(result.rows[0]) : null;
	}

	async findByEmail(email: string): Promise<User | null> {
		const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
		return result.rows.length > 0 ? this.mapDbRowToUser(result.rows[0]) : null;
	}

	async create(name: string, email: string): Promise<User> {
		const now = new Date();
		const result = await pool.query(
			"INSERT INTO users (name, email, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *",
			[name, email, now, now]
		);
		return this.mapDbRowToUser(result.rows[0]);
	}

	async update(id: number, name?: string, email?: string): Promise<User | null> {
		const now = new Date();
		const result = await pool.query(
			"UPDATE users SET name = COALESCE($2, name), email = COALESCE($3, email), updated_at = $4 WHERE id = $1 RETURNING *",
			[id, name, email, now]
		);
		return result.rows.length > 0 ? this.mapDbRowToUser(result.rows[0]) : null;
	}

	async delete(id: number): Promise<boolean> {
		const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
		return (result.rowCount ?? 0) > 0;
	}

	async existsByEmail(email: string, excludeId?: number): Promise<boolean> {
		let query = "SELECT 1 FROM users WHERE email = $1";
		const params: (string | number)[] = [email];

		if (excludeId) {
			query += " AND id != $2";
			params.push(excludeId);
		}

		const result = await pool.query(query + " LIMIT 1", params);
		return result.rows.length > 0;
	}
}

export const userRepository = new UserRepository();