import User from "../models/User.js";
import { USER_ROLES, USER_ROLE_VALUES } from "../utils/enums.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { createAuthToken, getUserIdFromToken } from "../utils/token.js";

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required." });
    }

    const user = await User.findOne({ email: normalizeEmail(email) })
      .select("+passwordHash")
      .exec();

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ success: false, error: "Invalid email or password." });
    }

    return sendAuthResponse(res, 200, user);
  } catch (error) {
    return next(error);
  }
}

export async function signup(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        error: "Name, email, password, and role are required.",
      });
    }

    if (!USER_ROLE_VALUES.includes(role)) {
      return res.status(400).json({ success: false, error: "Invalid account role." });
    }

    const normalizedEmail = normalizeEmail(email);
    const existingUser = await User.exists({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "An account with this email address already exists.",
      });
    }

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      passwordHash: hashPassword(password),
      role,
    });

    return sendAuthResponse(res, 201, user);
  } catch (error) {
    return next(error);
  }
}

export async function googleAuth(req, res, next) {
  try {
    const email = "google.user@nexventure.com";
    const user = await User.findOneAndUpdate(
      { email },
      {
        $setOnInsert: {
          name: "Google Member",
          email,
          passwordHash: hashPassword(`google:${Date.now()}`),
          role: USER_ROLES.FOUNDER,
        },
      },
      { new: true, upsert: true },
    ).exec();

    return sendAuthResponse(res, 200, user);
  } catch (error) {
    return next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: "Email address is required." });
    }

    return res.json({
      success: true,
      message: "If an account exists, password reset instructions have been sent.",
    });
  } catch (error) {
    return next(error);
  }
}

export async function getCurrentUser(req, res, next) {
  try {
    const token = getBearerToken(req.headers.authorization);
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({ success: false, error: "Invalid or missing auth token." });
    }

    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid or expired session." });
    }

    return res.json({ success: true, user: toAuthUser(user) });
  } catch (error) {
    return next(error);
  }
}

function sendAuthResponse(res, statusCode, user) {
  return res.status(statusCode).json({
    success: true,
    token: createAuthToken(user._id.toString()),
    user: toAuthUser(user),
  });
}

function toAuthUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

function getBearerToken(authorizationHeader) {
  if (!authorizationHeader?.startsWith("Bearer ")) return null;
  return authorizationHeader.slice("Bearer ".length);
}
