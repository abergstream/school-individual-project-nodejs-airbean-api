import db from "../../database/database.js";
import crypto from "crypto";
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};
const login = async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = hashPassword(password);
  const loginQuery = await db["admin"].findOne({
    username: username,
    password: hashedPassword,
  });
  if (loginQuery) {
    global.isAdmin = true;
    res.status(200).send("Logged in as admin");
  } else {
    global.isAdmin = false;
    return res.status(400).send("Wrong username or password");
  }
};
export { login };
