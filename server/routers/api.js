const express = require("express");
const router = express.Router();

router.get("/books", (req, res) => {
  res.json(req.session.books);
});

router.get("/books/:id", (req, res) => {
  const book = req.session.books.filter(
    (book) => String(book.id) === req.params.id
  );
  res.json(book);
});

router.put("/books/:id", (req, res) => {
  const book = req.body;

  const index = req.session.books.findIndex(
    (book) => String(book.id) === String(req.params.id)
  );

  if (index !== -1) {
    req.session.books[index] = book;
    req.session.save();
    res.end();
  } else {
    req.session.books.unshift(book);
    req.session.save();
    res.end();
  }
});

router.delete("/books/:id", (req, res) => {
  const index = req.session.books.findIndex(
    (book) => String(book.id) === String(req.params.id)
  );

  req.session.books.splice(index, 1);
  req.session.save();

  res.end();
});

module.exports = router;
