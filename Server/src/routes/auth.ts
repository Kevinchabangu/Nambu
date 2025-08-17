// src/routes/auth.ts
import { Router } from "express";
import { optionalAuth, requireAuth } from "../middleware/auth.js";

export const authRouter = Router();

// simple public endpoint
authRouter.get("/", (_req, res) => {
  res.send("Auth route");
});

// example protected endpoint
authRouter.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user ?? null });
});
// example optional auth endpoint
authRouter.get("/optional", optionalAuth, (req, res) => {
  if (req.user) {
    res.json({ message: "Authenticated", user: req.user });
  } else {
    res.json({ message: "Not Authenticated" });
  }
});
