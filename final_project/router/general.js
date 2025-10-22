const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  console.log(username)
  console.log(password)

  if (username && password) {
    if (!isValid(username)){
        users.push({"username": username, "password": password })
        return res.status(200).json({ message: "User now registered. You can login" });
    }else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user. Username or Password not provided" });
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
    let booksList = new Promise((resolve, reject) => {
        try{
            resolve(res.send(JSON.stringify({books}, null, 4)));
        } catch(err) {
            reject(err)
        }
    })
    booksList.then(() => console.log("resolved"))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    let booksList = new Promise((resolve, reject) => {
        try{
            let isbn = req.params.isbn;
            resolve(res.send(books[isbn]));
        } catch(err) {
            reject(err)
        }
    })
    booksList.then(() => console.log("resolved"))
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here

    let booksList = new Promise((resolve, reject) => {
        try{
            
            let author = req.params.author;
            let bookArray = Object.values(books);
            let filtered_Author = bookArray.filter((book) => {
                return book.author === author;
            })

            resolve(res.send(filtered_Author));
        } catch(err) {
            reject(err)
        }
    })
    booksList.then(() => console.log("resolved"))
   
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

let booksList = new Promise((resolve, reject) => {
        try{
            
            let title = req.params.title;
            let bookArray = Object.values(books);
            let filtered_Title = bookArray.filter((book) => {
            //console.log(book.title)
            //console.log(title)
            return book.title === title;
            })
            resolve(res.send(filtered_Title));
        } catch(err) {
            reject(err)
        }
    })
    booksList.then(() => console.log("resolved"))

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
    let isbn = req.params.isbn;
    res.send(books[isbn].reviews)
    
});

module.exports.general = public_users;
