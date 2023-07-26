const Book = require("../../models/Book");

module.exports = async (req, res, next) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All books found.",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};
