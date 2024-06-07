import db from "../../database/database.js";

const addPromotion = (req, res, next) => {
  const { title, products, price } = req.body;
  const date = new Date();
  const currentDateTime = date.toLocaleTimeString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
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
  res.send(`Promotion deleted`);
};

export { addPromotion, delPromotion };
