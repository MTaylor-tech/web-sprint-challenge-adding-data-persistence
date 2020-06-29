exports.up = async function(knex) {
	await knex.schema.createTable("projects", (table) => {
		table.increments("id")
		table.text("name").notNull()
		table.text("description")
    table.boolean("complete").notNullable().defaultTo(false)
	})

	await knex.schema.createTable("resources", (table) => {
		table.increments("id")
		table.text("name").notNull().unique()
    table.text("description")
	})

	await knex.schema.createTable("tasks", (table) => {
		table.increments("id")
		table.text("description").notNull()
    table.text("notes")
    table.boolean("complete").notNullable().defaultTo(false)
		// creates a foreign key
		table
			// should be the same data type as the primary key we're pointing at
			.integer("project_id")
			.references("id")
			.inTable("projects")
			// when the primary key I'm pointing at gets deleted,
			// set the value of this foreign key to null
			.onDelete("CASCADE")
			// when the primary key I'm pointing at gets changed,
			// update this foreign key to match the new value
			.onUpdate("CASCADE")
	})

	await knex.schema.createTable("projects_resources", (table) => {
		table
			.integer("project_id")
			.references("id")
			.inTable("projects")
			.onDelete("CASCADE")
			.onUpdate("CASCADE")
		table
			.integer("resource_id")
			.references("id")
			.inTable("resources")
			.onDelete("CASCADE")
			.onUpdate("CASCADE")
		// since this table doesn't need an ID column, we can make the
		// primary key a combination of two columns rather than a single one
		table.primary(["project_id", "resource_id"])
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("projects_resources")
	await knex.schema.dropTableIfExists("tasks")
	await knex.schema.dropTableIfExists("resources")
	await knex.schema.dropTableIfExists("projects")
}
