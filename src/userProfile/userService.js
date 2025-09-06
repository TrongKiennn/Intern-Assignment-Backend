const pool = require("../../config/database");

async function findUserById(id) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching user by email", error);
    return null;
  }
}

module.exports = {
  findUserById,
};
