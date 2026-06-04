const express = require("express");
const router = express.Router();
const {
  createTransaction,
  listTransactions,
  deleteTransaction,
  updateTransaction,
} = require("./transactions.controller");

router.post("/", createTransaction);
router.get("/", listTransactions);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
