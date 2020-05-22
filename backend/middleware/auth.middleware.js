// This middleware is passed into routes that require authorization and need a JWT token 
// sent to that route in the headers of the request
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const auth = (req, res, next) => {
  // Grab token from the req headers under "x-auth-token"
  const token = req.header("x-auth-token");

  // Check for token and if there is none return not authorized response
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  // If there is a token, token must be validated
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    // If token is not valid return message back as a response
    res.status(400).json({ msg: "Token is invalid" });
  }
};

export default auth;
