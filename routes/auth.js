const express = require("express");
const passport = require("passport");
const router = express.Router();

// Inicia el flujo OAuth con GitHub
router.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] }),
);

// GitHub redirige aquí después del login
router.get(
  "/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true,
  }),
  (req, res) => {
    res.redirect("/api-docs");
  },
);

// Cerrar sesión
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/api-docs");
  });
});

// Ver estado del usuario actual
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ loggedIn: true, user: req.user.username });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

module.exports = router;
