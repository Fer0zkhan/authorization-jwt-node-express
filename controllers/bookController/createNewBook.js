const Book = require("../../models/Book");

module.exports = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!req.user.id) return res.status(404).json({ error: "User not found" });

    const book = await Book.create({
      title: title,
      description: description,
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};
