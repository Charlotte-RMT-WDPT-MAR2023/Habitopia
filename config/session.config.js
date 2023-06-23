
const session = require("express-session");

const MongoStore = require('connect-mongo');


const mongoose = require('mongoose');

module.exports = (app) => {

  app.set("trust proxy", 1);

 
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 600000, // 600 * 1000 ms === 10 min
      },
      
    })
  );
};
