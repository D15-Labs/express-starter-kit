import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	// Create users table
	pgm.createTable('users', {
		id: {
			type: 'serial',
			primaryKey: true,
		},
		name: {
			type: 'varchar(255)',
			notNull: true,
		},
		email: {
			type: 'varchar(255)',
			notNull: true,
			unique: true,
		},
		created_at: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
		updated_at: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});

	// Create index on email for faster lookups
	pgm.createIndex('users', 'email');

	// Create trigger function to automatically update updated_at timestamp
	pgm.createFunction(
		'update_updated_at_column',
		[],
		{ returns: 'trigger', language: 'plpgsql' },
		`
		BEGIN
			NEW.updated_at = CURRENT_TIMESTAMP;
			RETURN NEW;
		END;
		`
	);

	// Create trigger
	pgm.createTrigger('users', 'update_users_updated_at', {
		when: 'BEFORE',
		operation: 'UPDATE',
		function: 'update_updated_at_column',
		level: 'ROW',
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	// Drop trigger first
	pgm.dropTrigger('users', 'update_users_updated_at');

	// Drop function
	pgm.dropFunction('update_updated_at_column', []);

	// Drop table (this will also drop the index)
	pgm.dropTable('users');
}
