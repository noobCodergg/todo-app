/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('todos', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('task').notNullable();
      table.boolean('completed').defaultTo(false);
      table.timestamps(true, true);
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
    return knex.schema.dropTable('todos');
  };
