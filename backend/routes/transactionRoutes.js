const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.get("/initialize", transactionController.initializeDatabase);
router.get("/transactions", transactionController.getAllTransactions);
router.get("/statistics", transactionController.getStatistics);
router.get("/bar-chart", transactionController.getBarChart);
router.get("/pie-chart", transactionController.getPieChart);
router.get("/all-data", transactionController.getCombinedData);

module.exports = router;
