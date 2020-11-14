import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db';
import User from './models/user';

// Session
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

// Load env vars
dotenv.config({ path: './src/config/config.env' });

// Connect mongodb session
const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: 'sessions'
})

// Router files
import shop from './routes/shop';
import admin from './routes/admin';
import product from './routes/product';
import auth from './routes/auth';

app.use(session({  
  secret: 'my secret', 
  resave: false, 
  saveUninitialized: false,
  store: store 
}));


// Connect to database
connectDB()
  .then(() => {

    User.find()
      .then(user => {

        if (!user) {

          const user = new User({
            Usr_Name: 'wilson',
            Usr_Email: 'wjuma19@gmail.com',
            Usr_Cart: {
              Cart_Items: []
            }
          });
      
          user.save();
        }
      });


  });

app.use((req, res, next) => {
  User.findOne({ _id: "5fae8d026d78c61ea0d2d7b3" })
    .then(user => { 
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
})
  

// Dev logging middlewares
if ( process.env.NODE_ENV === 'development' ) {
  app.use(morgan('dev'));
}

// Body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Settings
app.set('port', process.env.PORT || 3000);
app.set('node_env', process.env.NODE_ENV);

// Cors options
const corsOpts = { origin: process.env.CORS_ORIGIN }

// Mount routers
app.use('/api/v1/product', cors(corsOpts), product);
app.use('/api/v1/shop', cors(corsOpts), shop);
app.use('/api/v1/admin', cors(corsOpts), admin);
app.use('/api/v1/auth', cors(corsOpts), auth)


export default app;