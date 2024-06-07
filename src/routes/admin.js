import express from "express";
import { addPromotion, delPromotion } from "../controller/admin/promotions.js";
import {
  addPromotionMiddleware,
  delPromotionMiddleware,
} from "../middleware/admin/checkPromotion.js";
import {
  addProductMiddleware,
  changeProductMiddleware,
  deleteProductMiddleware,
} from "../middleware/admin/checkProduct.js";
import {
  addProduct,
  changeProduct,
  deleteProduct,
} from "../controller/admin/product.js";
import { checkAdmin } from "../middleware/admin/auth.js";
import { login } from "../controller/admin/login.js";

const router = express.Router();
// Endpoint for user registration
router.post("/product", checkAdmin, addProductMiddleware, addProduct);
router.delete("/product", checkAdmin, deleteProductMiddleware, deleteProduct);
router.put("/product", checkAdmin, changeProductMiddleware, changeProduct);

router.post("/promotion", checkAdmin, addPromotionMiddleware, addPromotion);

router.delete("/promotion", checkAdmin, delPromotionMiddleware, delPromotion);

// Endpoint for user login
router.post("/login", login);

export default router;
