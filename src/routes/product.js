import express from 'express';
const router = express.Router();

// Express validator
import { body, check } from 'express-validator';

import {
  getProduct,
  postProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product';

router.route('/')
      .get(getProduct)
      .post(
            [ 
                  body('Prod_Title', 'El nomobre del producto es obligatorio').not().isEmpty().trim(),
                  body('Prod_Price', 'El precio del producto es obligatorio').not().isEmpty().trim(),
                  body('Prod_Images', 'Debes de darle una imagen a tu producto').not().isEmpty(),
                  body('Prod_Description', 'La descriptción del producto es obligatoria').not().isEmpty().trim(),

            ],
            postProduct);

router.route('/:Prod_Id')
      .get(
            [
                  check('Prod_Id', 'Prod_Id no valido, debes de ingreasar un mongo _id valido').isMongoId()
            ],
            getProductById
      )
      .put(
            [
                  check('Prod_Id', 'Prod_Id no valido, debes de ingreasar un mongo _id valido').isMongoId()
            ],
            updateProduct
      )
      .delete(
            [
                  check('Prod_Id', 'Prod_Id no valido, debes de ingreasar un mongo _id valido').isMongoId()
            ],
            deleteProduct
      );

export default router;