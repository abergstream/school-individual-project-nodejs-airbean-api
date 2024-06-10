import db from "../../database/database.js";
import getDateTime from "./service.js";

const addPromotion = (req, res, next) => {
  const { title, products, price } = req.body;
  const date = new Date();
  const currentDateTime = getDateTime();
  const data = {
    title: title,
    createdAt: currentDateTime,
    products: products,
    price: price,
  };

  db.promotions.insert(data);
  res.status(200).send(`Promotion ${title} added`);
};
const delPromotion = (req, res, next) => {
  const { promotionID } = req.body;
  db.promotions.remove({ _id: promotionID });
  res.send(`Promotion ${promotionID} deleted`);
};

export { addPromotion, delPromotion };
