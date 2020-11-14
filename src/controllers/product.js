import slug from 'slug';
import { nanoid } from 'nanoid';
import { validationResult } from 'express-validator';
import _ from 'underscore';

import Product from '../models/product';


/**
 * @Desc Get list of all products
 * @route GET /api/v1/product
 * @access Public
 */

export const getProduct = (req, res, next) => {

  Product.find()
    .populate('Usr_Id', 'Usr_Name')
    .exec((err, docs) => {
      if(err){
         console.log(`Error: ` + err)
         res.status(500).json({
            success: false,
            error: {
              type: "Internal Server Error",
              msg: "No se puede completar la petición realizada por el navegador ya que se ha producido un error inesperado en el navegador.",
              err
            }
          })
      } else{
         res.json({
           success: true,
           result: {
             type: "OK",
             session: req.session,
             msg: "petición fue completada de manera exitosa",
             items: docs
           }
         });
      }
   });

}

/**
 * @Desc Create a new product
 * @route POST /api/v1/product
 * @access Private
 */

export const postProduct = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // console.log({errors: errors.array()});
    return res.status(400).json({ errors: errors.array() });
  }

  const Prod_Title_Slug = slug(req.body.Prod_Title);
  const Prod_Url = `${Prod_Title_Slug}-${nanoid(10)}`; 

  const body = {
    Prod_Title: req.body.Prod_Title,
    Prod_Slug: Prod_Title_Slug,
    Prod_Slug_Url: Prod_Url,
    Prod_Price: req.body.Prod_Price,
    Prod_Images: req.body.Prod_Images,
    Prod_Videos: req.body.Prod_Videos,
    Prod_Description: req.body.Prod_Description,
    Usr_Id: req.user._id
  }

  const producto = new Product(body);

  // console.log(producto);

  const productoGuardado = await producto.save();
  
  try {
    res.status(201).json({
      success: true,
      msg: 'Se ha creado el producto',
      producto: productoGuardado
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'No se pudo crear el producto',
      error
    })
  }
  
}

/**
 * @Desc Get a single product
 * @route GET /api/v1/product/:id
 * @access Public
 */

export const getProductById = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // console.log({errors: errors.array()});
    return res.status(400).json({ errors: errors.array() });
  }

  Product.findById({ 
      _id: req.params.Prod_Id
  }, (err, doc) => {
     if(err){
        console.log(`Error: ` + err);
        res.status(500).json({
          success: false,
          error: {
            type: "Internal Server Error",
            msg: `No se puede completar la petición realizada por el navegador ya que se ha producido un error inesperado en ${req.get('host')}.`,
            err
          }
        });
     } else{
       if(!doc){
          console.log(`El producto con el id: ${req.params.Prod_Id} no se encuentra en la base de datos`);
          res.status(404).json({
            error: {
              type: 404,
              success: false,
              type: "Not Found",
              msg: `El producto con el id: ${req.params.Prod_Id} no se encuentra en la base de datos`
            }
          });
       } else{
          res.json({
            result: {
              type: 200,
              success: true,
              msg: "petición fue completada de manera exitosa",
              item: doc
            }
          });
       }
     }
  });

}

/**
 * @Desc Update e single product
 * @route PUT /api/v1/product/:id
 * @access Private
 */

export const updateProduct = async (req, res, next) => {


  // Return a copy of the object, filtered to only have values for the allowed keys (or array of valid keys)
  const newProduct = _.pick(req.body, (product) => {
    return !_.isEmpty(product);
  });

  const [ updatedProduct, bdpIsValid ] = await Promise.all([
    Product.findByIdAndUpdate(req.params.Prod_Id, newProduct, { new: true }),
    Product.findById(req.params.Prod_Id)
  ]);

  if ( !bdpIsValid ) {
    return res.status(404).json({
      error: {
        type: 404,
        success: false,
        type: "Not Found",
        msg: `El producto con el id: ${req.params.Prod_Id} no se encuentra en la base de datos`
      }
    })
  }

  try {
    res.json({
      result: {
        type: 200,
        success: true,
        msg: "petición fue completada de manera exitosa",
        item: updatedProduct
      }
    });
  } catch (error) {
    console.log(`Error: ` + err);
    res.status(500).json({
      success: false,
      error: {
        type: "Internal Server Error",
        msg: `No se puede completar la petición realizada por el navegador ya que se ha producido un error inesperado en ${req.get('host')}.`,
        err
      }
    });
  }

}

/**
 * @Desc Delete e single product
 * @route DELETE /api/v1/product/:id
 * @access Private
 */

export const deleteProduct = async (req, res, next) => {

  // Errors req express validator
  const errors = validationResult(req);
  if(!errors.isEmpty()) { return res.status(400).json({ error: errors.array() }) };

  // Is product valid to delete
  const bdpIsValid = await Product.findOne({ _id: req.params.Prod_Id });

  try {
    
    if ( !bdpIsValid ) {
      return res.status(404).json({
        error: {
          type: 404,
          success: false,
          type: "Not Found",
          msg: `El producto con el id: ${req.params.Prod_Id} no se encuentra en la base de datos`
        }
      });
    }
  
    await Product.deleteOne({ _id: req.params.Prod_Id });

    try {
      res.json({
        success: true,
        msg: `El producto ${bdpIsValid.Prod_Title} se ha eliminado con éxito!`
      });
    } catch(error) {
      res.status(500).json({
        success: false,
        msg: '500: Internal server error, no se pudo eliminar el producto',
        error
      });
    }


  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        type: "Internal Server Error",
        msg: `No se puede completar la petición realizada por el navegador ya que se ha producido un error inesperado en ${req.get('host')}.`,
        error
      }
    });
  }
}

