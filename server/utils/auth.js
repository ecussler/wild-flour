// const jwt = require("jsonwebtoken");

// const secret = "secretphrase";
// const expiration = "4h";

// module.exports = {
//   authMiddleware: function ({ req }) {
//     let token = req.body.token || req.query.token || req.headers.authorization;

//     if (req.headers.authorization) {
//       token = token.split(" ").pop().trim();
//     }

//     if (!token) {
//       return req;
//     }

//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       console.log("Invalid token");
//     }

//     return req;
//   },
//   signToken: function ({ firstName, lastName, email, username, _id }) {
//     const payload = { firstName, lastName, email, username, _id };
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };

const auth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page. loggedIn is specified from the sesson creation
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, execute the route function
    // We call next() if the user is authenticated
    next();
  }
};

module.exports = auth;
