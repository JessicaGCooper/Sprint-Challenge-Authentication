/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization)

  if (authorization) {
    const secret = process.env.JWT_SECRET || "The little boy jumped to see such fun, & the cow ran away with the spoon!"

    jwt.verify(authorization, secret, function(error, decodedToken){
      if(error){
        res
        .status(401)
        .json({ message: "You shall not pass!", error })
      } else {
        req.token = decodedToken
        next()
      }
    });
  } else {
    res
    .status(400)
    .json({ message: "Please login and try again." })
  }
};
