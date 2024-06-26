const Expense = require("../models/Expense");
const DownloadedFile = require("../models/Download");
const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");

exports.downloadExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId, "userId is");

    const expenses = await Expense.findAll({ where: { UserId: userId } });

    const fields = ["createdAt", "description", "categories", "price"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(expenses);

    const fileName = `expenses_${Date.now()}.csv`;
    const downloadDir = path.join(__dirname, "..", "downloads");
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir);
    }
    const filePath = path.join(downloadDir, fileName);
    fs.writeFileSync(filePath, csv);

    res.download(filePath, fileName);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error downloading expenses" });
  }
};




exports.listDownloadedFiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const downloadedFiles = await DownloadedFile.findAll({
      where: { UserId: userId },
      attributes: ["fileUrl", "createdAt"], 
    });
    res.status(200).json(downloadedFiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching downloaded files" });
  }
};


exports.postLink = async (req, res) => {
  try {
    const { fileUrl } = req.body;
    const userId = req.user.id;

    if (!fileUrl) {
      return res.status(400).json({ message: "fileUrl is required" });
    }
    await DownloadedFile.create({ fileUrl, UserId: userId });
    res.status(201).json({ message: "File link stored successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error storing file link" });
  }
};
