const express = require("express");
const categoriesRouter = require("./categories/categories.routes");
const transactionsRouter = require("./transactions/transactions.routes");
const { initDb } = require("./config/db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true, name: "gestao-financeira-api" });
});

app.use("/categories", categoriesRouter);
app.use("/transactions", transactionsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint não encontrado" });
});

module.exports = {
  app,
  initDb,
};
