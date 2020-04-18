const express = require("express");
const router = require("router");
const Transaction = require("../models/transaction.js");

//Post the router in:
router.post("/api/transaction", ({ body }, res) => {

    Transaction.create(body)
      .then(dbTransaction => {
        res.json(dbTransaction);
      })
      .catch(err => {
          res.status(400).json(err);

      });
    });
    router.post("/api/transaction/bulk", ({ body }, res) => {
      Transaction.insertMany(body)
      .then(dbTransaction => {
          res.json(dbTransaction);

      })
      .catch(err => {
          res.status(400).json(err);
      });
    });

    module.exports = router;

