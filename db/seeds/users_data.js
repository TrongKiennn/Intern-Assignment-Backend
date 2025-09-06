/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Xóa dữ liệu cũ
  await knex("users").del();

  const now = new Date();

  // Insert mẫu
  await knex("users").insert([
    {
  
      name: "Michael",
      email: "abc@example.com",
      passwordhash:
        "$2b$08$5yz0zcK71bhCMcz5gZWqMu.NHiGQlooywdN8/yWo9w5T.ZJGaQ4WO",
      email_verified: true,
      created_at: now,
      updated_at: now,
    },
  ]);
};
