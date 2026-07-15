require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT ERROR:", err);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});