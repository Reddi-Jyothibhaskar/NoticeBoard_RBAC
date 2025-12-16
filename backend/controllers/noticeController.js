const Notice = require("../models/Notice");

exports.createNotice = async (req, res) => {
  const notice = new Notice({
    title: req.body.title,
    content: req.body.content,
    createdBy: req.user.userId
  });

  await notice.save();
  res.status(201).json(notice);
};

exports.getNotices = async (req, res) => {
  const notices = await Notice.find({ status: "approved" });
  res.json(notices);
};

exports.approveNotice = async (req, res) => {
  const notice = await Notice.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );
  res.json(notice);
};

//Newly added

exports.getPendingNotices = async (req, res) => {
  const notices = await Notice.find({ status: "pending" });
  res.json(notices);
};