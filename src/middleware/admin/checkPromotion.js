import db from "../../database/database.js";
import joi from "joi";

const promotionSchema = joi.object({
  title: joi.string().min(3).max(20).required(),
  products: joi.array().min(1),
  price: joi.number().required(),
});

const addPromotionMiddleware = async (req, res, next) => {
  const { error } = promotionSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { products, price } = req.body;
  let totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    const quantity = products[i].quantity;
    const productID = products[i].productID;

    if (quantity && quantity <= 0) {
      return res
        .status(400)
        .json({ error: "Quantity can not be negative or zero" });
    }
    try {
      const productQuery = await db.menu.findOne({ _id: productID });

      if (!productQuery) {
        return res.status(404).json({
          error: "One or more products could not be found in the menu",
        });
      }
      totalPrice += productQuery.price;
    } catch (error) {
      console.error("Error querying the database:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  if (price > totalPrice) {
    return res.status(400).json({
      error: "Promotion price is higher than original price",
    });
  }
  next();
};

const delPromotionMiddleware = async (req, res, next) => {
  const { promotionID } = req.body;
  const promotionQuery = await db.promotions.findOne({ _id: promotionID });
  if (!promotionQuery) {
    return res.status(400).json({
      error: `Promotion ${promotionID} could not be found`,
    });
  }
  next();
};
export { addPromotionMiddleware, delPromotionMiddleware };
