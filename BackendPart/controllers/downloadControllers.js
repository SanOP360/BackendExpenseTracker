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

    const fileUrl = `/downloads/${fileName}`;
    await DownloadedFile.create({ fileUrl, UserId: userId });

    // Send the file as an attachment
    res.download(filePath, fileName);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error downloading expenses" });
  }
};
