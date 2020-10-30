import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import CookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import Cards from "./models/dbCards.js";

//routes
import signInRoute from "./routes/signIn.js";
import signUpRoute from "./routes/signUp.js";

import checkAuth from "./middleware/authCheck.js";

const ENV_JWT_TOKEN = "fyOMG332oPsTxi"; // make it global

// app config
const app = express();
const port = process.env.PORT || 8001;

const db_user = "grizzlyn44";
const db_password = "Sujmw5wCJiw3qNmB";
const db_name = "fs-1";

const connection_url = `mongodb+srv://${db_user}:${db_password}@cluster0.sypta.mongodb.net/${db_name}?retryWrites=true&w=majority`;

// middlewares
app.use(express.json());
app.use(CookieParser());
app.use(cors({
  origin: "https://localhost:3001",
  credentials: true
}));

// db congif
mongoose.connect(
  connection_url,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.log("Error in connection to DB", err);
    } else {
      console.log("Connected to DB");
    }
  }
);

// api endpoints

app.use(signInRoute);
app.use(signUpRoute);

// app.get("/", (req, res) => {
//   res.status(200).send("Hello world");
// });

app.get("/cards", (req, res, next) => { //checkAuth
  const token = req.cookies.access_token
  console.log("token", token)
  const decoded = jwt.verify(token, ENV_JWT_TOKEN)
  console.log("decoded", decoded)

  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// app.post("/api/cards", (req, res) => {
//   const dbCard = req.body;
//   Cards.create(dbCard, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data);
//     }
//   });
// });

// listener
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
