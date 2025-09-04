/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {

  await knex.raw(`DROP TABLE IF EXISTS users CASCADE;`);
  await knex.raw(`DROP SEQUENCE IF EXISTS users_id_seq CASCADE;`);

  await knex.raw(`CREATE SEQUENCE IF NOT EXISTS users_id_seq START WITH 1;`);


  await knex.raw(
    `CREATE TABLE users (
      id INTEGER DEFAULT nextval('users_id_seq') PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) NOT NULL UNIQUE,
      passwordHash VARCHAR(255) NOT NULL,
      salt VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`DROP TABLE IF EXISTS users CASCADE;`);
  await knex.raw(`DROP SEQUENCE IF EXISTS users_id_seq CASCADE;`);
};
