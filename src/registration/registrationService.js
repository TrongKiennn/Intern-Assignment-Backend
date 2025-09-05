const pool = require("../../config/database");

async function createUser({
  name,
  email,
  passwordHash,
  email_verification_token,
  email_verification_expiration,
}) {
  try {
    const query = `
      INSERT INTO users (name, email, passwordhash, email_verification_token, email_verification_expiration)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;

    const values = [
      name,
      email,
      passwordHash,
      email_verification_token,
      email_verification_expiration,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
}

async function getUserByVerificationToken(token) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email_verification_token = $1`,
    [token]
  );
  return result.rows[0];
}

async function verifyUserEmail(userId) {
  await pool.query(
    `UPDATE users
     SET email_verified = true,
         email_verification_token = NULL,
         email_verification_expiration = NULL
     WHERE id = $1`,
    [userId]
  );
}

module.exports = {
  createUser,
  getUserByVerificationToken,
  verifyUserEmail,
};
