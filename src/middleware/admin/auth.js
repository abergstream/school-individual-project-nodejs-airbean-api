const checkAdmin = async (req, res, next) => {
  if (!global.isAdmin) {
    return res.send("Not authorized admin");
  }

  next();
};
export { checkAdmin };
