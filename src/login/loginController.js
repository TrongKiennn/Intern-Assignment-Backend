const loginService = require("./loginService");
const authSerVice = require("../auth/authService");
const config = require("../../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

async function handleLoginRequest(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await loginService.findUserByEmail(email);
    console.log(email)

    if (!user) {
     
      return res.status(401).json({ error: "Incorrect Email or Password!" });
    }

    // const validPassword = await bcrypt.compare(password, user.passwordhash);
    // if (!validPassword) {
    //   return res
    //     .status(401)
    //     .render("login", { error: "Incorrect Email or Password!" });
    // }

    const accessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    const refreshToken = uuidv4();

    await authSerVice.saveRefreshToken(refreshToken, expiredAt, user.id);

    return res.status(200).json({
      user: { id: user.id, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return next(err);
  }
}

async function refreshToken(requestToken) {
  if (!requestToken) throw new Error("Refresh Token is required!");

  const tokenRow = await authSerVice.findRefreshToken(requestToken); 

  if (!tokenRow) throw new Error("Refresh token not found!");

  if (new Date(tokenRow.expiry_date) < new Date()) {
    await authSerVice.deleteRefreshTokenById(tokenRow.id);
    throw new Error("Refresh token expired. Please sign in again.");
  }

  const newAccessToken = jwt.sign({ id: tokenRow.user_id }, config.secret, {
    expiresIn: config.jwtExpiration,
  });

  return {
    accessToken: newAccessToken,
    refreshToken: tokenRow.token,
  };
}

module.exports = {
  handleLoginRequest,
  refreshToken,
};
