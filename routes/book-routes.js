const express = require('express');
const router = express.Router();

const Book = require("../models/Book");

/* GET home page */
router.get('/books', (req, res, next) => {
  Book.find({})
    .then(booksFromDB =>{
      // res.send(booksFromDB);
      res.render("book-views/books-list", {books: booksFromDB});
    })
    .catch(err => next(err))
  
});

router.get('/books/details/:id', (req, res, next) => {
  const id = req.params.id;
  Book.findById(id)
    .then(resultFromSearch =>{
      res.render("book-views/details", {book: resultFromSearch})
    })
    .catch(err => next(err))
});

router.get('/books/create-new-book', (req, res, next) => {
  res.render("book-views/new-book")
});

router.post('/books/creation', (req, res, next) => {
  Book.create({
    title: req.body.title, 
    author: req.body.author, 
    image: req.body.image
  });

  res.redirect("/books")
});

router.post('/books/delete/:id', (req, res, next) => {
  Book.findByIdAndDelete(req.params.id)
    .then(res.redirect("/books"))
    .catch(err => next(err))
});

router.get('/books/editbook/:id', (req, res, next) => {
  Book.findById(req.params.id)
    .then(book =>{
      res.render("book-views/edit", {book})
      // res.redirect("/books/details/" + id)
    })
    .catch(err => next(err))
});

router.post('/books/editbook/:id', (req, res, next) => {
  Book.findByIdAndUpdate(req.params.id,{
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    })
    .then(book =>{
      // res.render("book-views/edit", {book})
      res.redirect("/books/details/" + req.params.id)
    })
    .catch(err => next(err))
});

module.exports = router;
