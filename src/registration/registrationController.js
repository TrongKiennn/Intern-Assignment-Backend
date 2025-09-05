const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");
const bcrypt = require("bcryptjs");

const { findUserByEmail } = require("../login/loginService");

const {
  createUser,
  getUserByVerificationToken,
  verifyUserEmail,
} = require("./registrationService");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

// Đăng ký tài khoản
async function handleRegisterRequest(req, res) {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const verificationToken = uuidv4();
    const expiration = dayjs().add(1, "hour").format("YYYY-MM-DD HH:mm:ss");
    const otp = verificationToken.slice(0, 6).toUpperCase();

    await createUser({
      name,
      email,
      passwordHash: hashedPassword,
      email_verification_token: verificationToken,
      email_verification_expiration: expiration,
    });

    const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
      from: `"Verify Team" <${process.env.AUTH_EMAIL}>`,
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Hello ${name},</h2>
        <p>Please click the link below to verify your email:</p>
        <a href="${verifyLink}">Verify Email</a>
        <p>Or use this OTP code: <strong>${otp}</strong></p>
        <p>This code expires in 1 hour.</p>
      `,
    });

    return res.status(201).json({
      message: "User registered successfully! Verification email sent.",
    });
  } catch (err) {
    console.error("Error in handleRegisterRequest:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Xác thực email
async function handleVerifyEmail(req, res) {
  try {
    const { token } = req.query;

    const user = await getUserByVerificationToken(token);

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (user.email_verified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    if (dayjs().isAfter(user.email_verification_expiration)) {
      return res.status(400).json({ message: "Token expired" });
    }

    await verifyUserEmail(user.id);

    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error("Error in handleVerifyEmail:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleVerifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.email_verified) {
      return res.status(400).json({ message: "Email already verified." });
    }

    if (!user.email_verification_token || !user.email_verification_expiration) {
      return res.status(400).json({ message: "No verification in progress." });
    }

    const expectedOtp = user.email_verification_token.slice(0, 6).toUpperCase();

    if (otp.toUpperCase() !== expectedOtp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    if (dayjs().isAfter(user.email_verification_expiration)) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    await verifyUserEmail(user.id);

    return res
      .status(200)
      .json({ message: "Email verified successfully via OTP!" });
  } catch (err) {
    console.error("Error in handleVerifyOtp:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  handleRegisterRequest,
  handleVerifyEmail,
  handleVerifyOtp,
};
