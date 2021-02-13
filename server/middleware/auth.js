const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Read token from header
  const token = req.header("x-auth-token");
  // Check if  there is token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "You are not authorized to do this action" });
  }
  // validate token
  try {
    const cifrated = jwt.verify(token, process.env.SECRET);
    req.user = cifrated.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Authorization not valid" });
  }
};
