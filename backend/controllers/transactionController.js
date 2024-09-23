const axios = require("axios");
const Transaction = require("../models/Transaction");

exports.initializeDatabase = async () => {
  try {
    const { data } = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    return "Good to Go!!!";
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};

exports.getAllTransactions = async (req) => {
  const { month, search = "", page = 1, perPage = 10 } = req.query;
  const regex = new RegExp(search, "i");
  const monthNumber = new Date(`${month} 1, 2021`).getMonth() + 1;

  try {
    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber],
      },
    };

    if (search) {
      query.$or = [{ title: regex }, { description: regex }];
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    return { transactions };
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};

exports.getStatistics = async (req) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2021`).getMonth() + 1;

  try {
    const totalSalesResult = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
        },
      },
      { $group: { _id: null, totalSaleAmount: { $sum: "$price" } } },
    ]);

    const totalSales =
      totalSalesResult.length > 0 ? totalSalesResult[0].totalSaleAmount : 0;

    const soldItems = await Transaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      sold: true,
    });

    const notSoldItems = await Transaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      sold: false,
    });

    return { totalSales, soldItems, notSoldItems };

  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};


exports.getBarChart = async (req) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2021`).getMonth() + 1;
  const priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  try {
    const ranges = [];
    const counts = [];

    for (const range of priceRanges) {
      const count = await Transaction.countDocuments({
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
        price: { $gte: range.min, $lte: range.max },
      });

      ranges.push(range.range);
      counts.push(count);
    }

    return { ranges, counts };
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};


exports.getPieChart = async (req) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2021`).getMonth() + 1;

  try {
    const pieData = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
        },
      },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    return pieData; 

  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};


exports.getCombinedData = async (req, res) => {
  try {
    const transaction = await exports.getAllTransactions(req, res);
    const statistics = await exports.getStatistics(req, res);
    const barChart = await exports.getBarChart(req, res);
    const pieChart = await exports.getPieChart(req, res);
    res
      .status(200)
      .json({ transaction,statistics, barChart, pieChart });
  } catch (error) {
    res.status(500).send("Error fetching combined data.");
  }
};
