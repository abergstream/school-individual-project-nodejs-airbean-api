import joi from "joi";
import db from "../../database/database.js";

const addProductSchema = joi.object({
  title: joi.string().min(2).max(20).required(),
  desc: joi.string().min(2).max(50).required(),
  price: joi.number().required(),
});

const changeProductSchema = joi.object({
  productID: joi.string().alphanum().required(),
  title: joi.string().min(2).max(20),
  desc: joi.string().min(2).max(50),
  price: joi.number(),
});

const deleteProductSchema = joi.object({
  productID: joi.string().alphanum().required(),
});

const addProductMiddleware = async (req, res, next) => {
  const { error } = addProductSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  next();
};

const changeProductMiddleware = async (req, res, next) => {
  const { error } = changeProductSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { productID } = req.body;
  const productExist = await db.menu.findOne({ _id: productID });
  if (!productExist) {
    return res.status(404).send("Could not find the product");
  }

  next();
};

const deleteProductMiddleware = async (req, res, next) => {
  const { error } = deleteProductSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { productID } = req.body;
  const productExist = await db.menu.findOne({ _id: productID });
  if (!productExist) {
    return res.status(404).send("Could not find the product");
  }

  next();
};

export {
  addProductMiddleware,
  changeProductMiddleware,
  deleteProductMiddleware,
};
