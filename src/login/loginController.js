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

    const validPassword = await bcrypt.compare(password, user.passwordhash);
    if (!validPassword) {
      return res
        .status(401)
        .render("login", { error: "Incorrect Email or Password!" });
    }

    const accessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    const refreshToken = uuidv4();

    await authSerVice.saveRefreshToken(refreshToken, expiredAt, user.id);

    return res.status(200).json({
      user: { id: user.id, email: user.email, name:user.name },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return next(err);
  }
}

async function refreshToken(req,res) {
  const { refreshToken: requestToken } = req.body;
  console.log("I'm here");
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await authSerVice.findRefreshToken(requestToken);

    console.log(refreshToken);

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (new Date(refreshToken.expiry_date) < new Date()) {
      await authSerVice.deleteRefreshTokenById(refreshToken.id);
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return
    }
  
    const newAccessToken = jwt.sign(
      { id: refreshToken.user_id },
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    return  res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports = {
  handleLoginRequest,
  refreshToken,
};
