import express from "express";

import User from "../models/dbUser.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ENV_JWT_TOKEN = "fyOMG332oPsTxi"; // make it global
const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  let userAlreadyExists = false;

  await User.find({ email })
    .exec()
    .then(user => {
      console.log("email?", user);
      if (user.length > 0) {
        userAlreadyExists = true;
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Server error"
      });
    });

  if (userAlreadyExists) {
    console.log("?", userAlreadyExists);
    return res.status(409).send({
      message: "Email already in use"
    });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send(err);
    }

    const user = new User({ email, password: hash, isDeleted: false });
    user
      .save()
      .then(response => {
        return res.status(201).send({
          message: "User created",
          response
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Error with creating user",
          err
        });
      });
  });
});

export default router;
