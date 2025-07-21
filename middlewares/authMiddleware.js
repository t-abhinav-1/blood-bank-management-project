const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    console.log("entered authMiddleware");
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) console.log("no taken available");
    // console.log(token);
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed 1",
        });
      } else {
        req.user = decode;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Auth Failed 2",
      error,
    });
  }
};
