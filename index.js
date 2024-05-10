const express = require("express");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errHandlers = require("./middleware/errHandlers");
const cookieParser = require("cookie-parser");
const db = require("./models");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");

const app = express();

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate");
  next();
});

// * Middleware
app.use(logger);
app.use(credentials);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// * Routers
app.use("/oauth", require("./routes/oauth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use("/users", require("./routes/api/users"));
app.use("/admin", require("./routes/api/admin"));
app.use("/events", require("./routes/api/event"));
app.use("/bundle-soal", require("./routes/api/bundle_soal"));

app.use("/referensi", require("./routes/api/referensi"));
app.use("/soal", require("./routes/api/soal"));

app.use(errHandlers);

db.sequelize.sync().then(() => {
  app.listen(5002, () => {
    console.log("Server up and running on port 5002....");
  });
});
