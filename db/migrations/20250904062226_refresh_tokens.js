/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`DROP TABLE IF EXISTS refresh_tokens CASCADE;`);
  await knex.raw(`DROP SEQUENCE IF EXISTS refresh_tokens_id_seq CASCADE;`);

  await knex.raw(
    `CREATE SEQUENCE IF NOT EXISTS refresh_tokens_id_seq START WITH 1;`
  );

  await knex.raw(`
    CREATE TABLE refresh_tokens (
      id INTEGER DEFAULT nextval('refresh_tokens_id_seq') PRIMARY KEY,
      token VARCHAR(255) NOT NULL,
      expiry_date TIMESTAMP NOT NULL,
      user_id INTEGER NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE
    );
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`DROP TABLE IF EXISTS refresh_tokens CASCADE;`);
  await knex.raw(`DROP SEQUENCE IF EXISTS refresh_tokens_id_seq CASCADE;`);
};
