const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// POST new transaction
router.post("/", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a transaction by ID
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting transaction" });
  }
});

// UPDATE a transaction by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating transaction" });
  }
});


module.exports = router;
