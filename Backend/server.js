const app = require("./App");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the application");
});
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

const server = app.listen(process.env.PORT, () => {
  console.log("connnected successfully");
});

process.on("unhandledRejection", () => {
  console.log(`shutting down the server ${err.message}`);

  server.close(() => {
    process.exit(0);
  });
});
