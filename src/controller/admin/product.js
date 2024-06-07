import db from "../../database/database.js";

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
    return res.status(404).send({ message: "Could not find the product" });
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

  res.json({ success: true });
};

const deleteProduct = async (req, res, next) => {
  const { productID } = req.body;
  db["menu"].remove({ _id: productID });
  res.status(200).json({ message: "Product deleted" });
};

function getDateTime() {
  const date = new Date();
  const currentDateTime = date.toLocaleTimeString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return currentDateTime;
}
export { addProduct, changeProduct, deleteProduct };
