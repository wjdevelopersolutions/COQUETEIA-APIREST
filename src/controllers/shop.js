import Product from '../models/product';
import Order from '../models/order';

/**
 * @Desc Get list of all shops
 * @route GET /api/v1/shop
 * @access Public
 */
export const getShop = (req, res, next) => {
  res.json({
    success: true,
    msg: 'Show all shops'
  });
}

/**
 * @Desc Create a new shop
 * @route POST /api/v1/shop
 * @access Private
 */
export const postShop = (req, res, next) => {
  res.json({
    success: true,
    msg: 'Create a shop'
  });
}

/**
 * @Desc Show All Items In Shopping Cart
 * @route GET /api/v1/shop/add-to-cart
 * @access Public
 */

export const getCart = (req, res, next) => {
  req.user
    .populate('Usr_Cart.Cart_Items.Prod_Id')
    .execPopulate()
    .then(user => {
      // console.log(user.Usr_Cart.Cart_Items);
      res.json({
        success: true,
        msg: 'Mi carrito',
        items: user.Usr_Cart.Cart_Items
      });
    });
}

/**
 * @Desc Add e new item to shopping cart
 * @route POST /api/v1/shop/add-to-cart
 * @access Public
 */
export const postShopAddToCart = (req, res, next) => {
  Product.findById(req.body.Prod_Id)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {

      res.json({
        success: true,
        msg: 'Producto agregado al carrito',
        result
      });
    });
}

/**
 * @Desc Delete an item from the shopping cart
 * @route POST /api/v1/shop/add-to-cart
 * @access Public
 */
export const deleteShopAddToCart = (req, res, next) => {
  req.user.removeFromCart(req.body.Item_Id)
    .then(Cart_Items => {
      res.json({
        success: true,
        msg: 'Item eliminado del carrito de compras!'
      })
    })
}

/**
 * @Desc Get all new Order
 * @route GET /api/v1/shop/orders
 * @access Private
 */
export const getOrders = (req, res, next) => {

  Order.find({ 'Ord_User.Usr_Id': req.user._id })
    .then(orders => {

      res.json({
        success: true,
        msg: 'Get all orders!',
        orders
      })
    })
    .catch(console.log)

}

/**
 * @Desc Create a new Order
 * @route POST /api/v1/shop/orders
 * @access Private
 */
export const postOrders = (req, res, next) => {

  req.user
    .populate('Usr_Cart.Cart_Items.Prod_Id')
    .execPopulate()
    .then(user => {

      const products = user.Usr_Cart.Cart_Items.map( i => {

        console.log(i.Prod_Id);
        return { Cart_Prod_Quantity: i.Item_Quantity, Cart_Prod: { ...i.Prod_Id  } }
      });

      const order = new Order({
        Ord_Products: products,
        Ord_User: {
          Usr_Name: req.user.Usr_Name,
          Usr_Id: req.user._id
        }
      });

      return order.save();
    })
    .then(result => {
      return req.user.clearCart();     
    })
    .then(order => {
      res.json({
        success: true,
        msg: 'Se ha creado tu orden con exito!'
      })
    })
    .catch(err => console.log(err));

}

// /**
//  * @Desc Get a single shop
//  * @route GET /api/v1/shop/:id
//  * @access Public
//  */

// export const getShopById = (req, res, next) => {

//   res.json({
//     success: true,
//     msg: `Show shop ${req.params.id}`
//   });
// }

// /**
//  * @Desc Update e single shop
//  * @route PUT /api/v1/shop/:id
//  * @access Private
//  */

// export const updateShop = (req, res, next) => {

//   res.json({
//     success: true,
//     msg: `Update shop ${req.params.id}`
//   });
// }

// /**
//  * @Desc Delete e single shop
//  * @route DELETE /api/v1/shop/:id
//  * @access Private
//  */

// export const deleteShop = (req, res, next) => {

//   res.json({
//     success: true,
//     msg: `Delete shop ${req.params.id}`
//   });
// }

