const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let usersWithSameName = users.filter((user) => {
        return user.username === username;
    })
    return usersWithSameName.length >0

}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

let registeredUsers = users.filter((user) => {
    return user.username === username && user.password === password
});
return registeredUsers.length > 0

}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "There was an error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      userUsername: username
    }, 'lettuce', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

    let isbn = req.params.isbn;
    let review = req.query.review
    let username = req.session.authorization.username
    let userReview = books[isbn].reviews[username]

    if (isbn){
        books[isbn].reviews[username] = review
    }
    console.log(review)
    console.log(username)
    console.log(userReview)
    res.send(books[isbn].reviews)


});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
