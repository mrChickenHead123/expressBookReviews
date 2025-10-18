const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
    res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    let isbnNumber = req.params.isbn;
    let filtered_ISBNnumber = books.filter((book) => {
        return book[isbnNumber] === isbnNumber
    })
    res.send(filtered_ISBNnumber)
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
   let filtered_Author = books.filter((book) => {
        return book[author] === author
    })
    res.send(filtered_Author);
   
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  let title = req.params.title;
   let filtered_Title = books.filter((book) => {
        return book[title] === title
    })
    res.send(filtered_Title);

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
    let isbn = req.params.isbn;
    let filtered_isbn = books.filter((book) => {
        return book[reviewIsbn] === reviewIsbn
    })
    res.send(filtered_isbn["reviews"]);

  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
