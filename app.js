require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const app = express();
const { initDb } = require("./db/connect");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(express.json());

// Sesiones (debe ir ANTES de passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Estrategia GitHub OAuth
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Aquí podrías guardar el usuario en MongoDB si quisieras
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// Iniciar servidor
initDb((err) => {
  if (err) {
    console.log("Error de conexión:", err);
  } else {
    app.listen(process.env.PORT || 8080, () => {
      console.log("Servidor corriendo en el puerto 8080");
    });
  }
});
