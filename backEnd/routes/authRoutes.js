import { Router } from "express";
import {
  getCurrentUser,
  googleAuth,
  login,
  resetPassword,
  signup,
} from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/google", googleAuth);
router.post("/reset-password", resetPassword);
router.get("/me", getCurrentUser);

export default router;
