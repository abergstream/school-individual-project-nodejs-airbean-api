import db from "../../database/database.js";
import getDateTime from "./service.js";

const addProduct = async (req, res, next) => {
  const { title, desc, price } = req.body;
  const currentDateTime = getDateTime();
  const newProduct = {
    title: title,
    desc: desc,
    price: price,
    createdAt: currentDateTime,
    modifiedAt: "",
  };
  db.menu.insert({ ...newProduct });
  res.status(200).send(`Product  ${title} added`);
};

const changeProduct = async (req, res, next) => {
  const { productID, title, desc, price } = req.body;
  const menuQuery = await db.menu.findOne({ _id: productID });
  if (!menuQuery) {
    return res.status(404).send({ message: `Could not find ${productID}` });
  }
  const newTitle = title ? title : menuQuery.title;
  const newDesc = desc ? desc : menuQuery.desc;
  const newPrice = price ? price : menuQuery.price;
  const currentDateTime = getDateTime();

  db["menu"].update(
    { _id: productID },
    {
      $set: {
        title: newTitle,
        desc: newDesc,
        price: newPrice,
        modifiedAt: currentDateTime,
      },
    }
  );

  res.status(200).send(`Product ${productID} changed`);
};

const deleteProduct = async (req, res, next) => {
  const { productID } = req.body;
  db["menu"].remove({ _id: productID });
  res.status(200).send(`Product ${productID} deleted`);
};

export { addProduct, changeProduct, deleteProduct };
