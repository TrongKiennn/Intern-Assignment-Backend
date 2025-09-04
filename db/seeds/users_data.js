/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Xóa dữ liệu cũ
  await knex("users").del();

  // Insert mẫu
  await knex("users").insert([
    {
      name: "Admin User",
      email: "admin@example.com",
      passwordHash: "$2a$10$saltsaltsaltsaltsaltsaltABCDEFG1234567890", // bcrypt hash giả
    },
    {
      name: "John Doe",
      email: "john@example.com",
      passwordHash: "$2a$10$saltsaltsaltsaltsaltsaltHIJKLMN9876543210",
    },
  ]);
};
