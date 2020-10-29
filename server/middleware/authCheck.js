import jwt from "jsonwebtoken";

const ENV_JWT_TOKEN = "fyOMG332oPsTxi"; // make it global

const authCheck = (req, res, next) => {
  const { headers } = req;
  const { authorization } = headers;
  const token = authorization.split(" ")[1]; // skip Bearer
  try {
    const decoded = jwt.verify(token, ENV_JWT_TOKEN);
    console.log("decoded", decoded);
    req.userData = decoded;
    next();
  } catch {
    res.status(401).send({
      message: "Auth failed"
    });
  }
};

export default authCheck;
