const router = require("express").Router();
const Transaction = require("../models/transaction.js");



router.get("/api/transaction", (req, res) => {
  console.log("API/transactions GET route hit!!!")

  Transaction.find({}).sort({date: -1})
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/api/transaction", ({ body }, res) => {
  console.log("API/transactions POST route hit!!!")
  console.log(body);

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

