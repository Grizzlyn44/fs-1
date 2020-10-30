import express from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/dbUser.js";

const ENV_JWT_TOKEN = "fyOMG332oPsTxi"; // make it global
const router = express.Router();

router.post("/signin", async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  let userFound = false;
  let user = null;

  const authFail = () => {
    return res.status(401).send({
      message: "Invalid password or email"
    });
  };

  await User.find({ email })
    .exec()
    .then(users => {
      if (users.length > 0) {
        userFound = true;
        user = users[0];
      }
    })
    .catch(err => {
      return res.status(500).send({
        message: "Server error"
      });
    });

  if (!userFound || !user) {
    return authFail();
  }

  bcrypt.compare(password, user.password, (err, response) => {
    if (err) {
      return res.status(500).send({
        message: "Server error"
      });
    }
    if (response) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id
        },
        ENV_JWT_TOKEN,
        {
          expiresIn: "2m"
        }
      );

      res.cookie("access_token", token, {
        maxAge: 1600,
        httpOnly: true,
        // secure: true // jen v produkci
      })

      return res.status(200).send({
        message: "Signed in successfully",
        // token
      });
    }

    return authFail();
  });
});

export default router;
