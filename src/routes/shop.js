import express from 'express';
const router = express.Router();

import {
//   getShop,
//   postShop,
//   getShopById,
//   updateShop,
  deleteShop,
  getCart,
  postShopAddToCart,
  deleteShopAddToCart,
  getOrders,
  postOrders
} from '../controllers/shop';

router.route('/')
      // .get(getShop)
      // .post(postShop);

router.route('/add-to-cart')
      .get(getCart)
      .post(postShopAddToCart)
      .delete(deleteShopAddToCart);

router.route('/order')
      .get(getOrders)
      .post(postOrders);

router.route('/:id')
      // .get(getShopById)
      // .put(updateShop)
      // .delete(deleteShop);

export default router;