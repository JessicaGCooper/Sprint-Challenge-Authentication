const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const Users = require('./auth-model.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password =  hash
  
  Users.add(user)
    .then(savedUser => {
      res
      .status(201)
      .json(savedUser)
  })
  .catch(error => {
    res
    .status(500)
    .json({ message: "The server was not able to create the user", error})
  })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body

  Users.findBy({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)){

      const token = signToken(user);

      res
      .status(200)
      .json({ token, message: `Welcome ${user.username}!` })
    } else {
      res
      .status(401)
      .json({ message: "You shall not pass!"})
    }
  })
  .catch(error => {
    res
    .status(500)
    .json({ message: "Please try again."})
  })
});

function signToken(user) {
  
  const payload = {
    username: user.username
  };

  const secret = process.env.JWT_SECRET || "The little boy jumped to see such fun, & the cow ran away with the spoon!"
  

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
};

module.exports = router;
