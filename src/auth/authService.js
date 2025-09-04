const pool = require("../../config/database");

async function saveRefreshToken(token, expiryDate, userId) {
  try {
    const query = `
      INSERT INTO refresh_tokens (token, expiry_date, user_id)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id)
      DO UPDATE SET 
        token = EXCLUDED.token,
        expiry_date = EXCLUDED.expiry_date,
        updated_at = CURRENT_TIMESTAMP;
    `;

    await pool.query(query, [token, expiryDate, userId]);
  } catch (error) {
    console.error("Error saving refresh token:", error);
    throw error;
  }
}


async function findRefreshToken(requestToken) {
  try {
    const result = await pool.query(
      "SELECT * FROM refresh_tokens WHERE token = $1 LIMIT 1",
      [requestToken]
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  } catch (error) {
    console.error("Error finding refresh token:", error);
    return null;
  }
}

async function deleteRefreshTokenById(id) {
  try {
    const result = await pool.query(
      "DELETE FROM refresh_tokens WHERE id = $1",
      [id]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting refresh token:", error);
    return false;
  }
}

module.exports = {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshTokenById,
};