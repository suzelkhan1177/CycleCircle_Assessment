const express = require("express");
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

const Pages = require("../controllers/pages");
const User = require("../controllers/user");
const Products = require("../controllers/products");
const Warehouse = require("../controllers/warehouse");
const Stock = require("../controllers/stock");
const State = require("../controllers/state");
const Order = require("../controllers/order");

// Pages router
router.get("/", Pages.login);
router.get("/signup", Pages.signUp);
router.get('/dashboard', authMiddleware, Pages.dashBoard);
router.get('/add-orders', authMiddleware, Pages.Order);
router.get('/add-stock', authMiddleware, Pages.Stock);
router.get('/add-state', authMiddleware, Pages.State);
router.get('/add-warehouse', authMiddleware, Pages.Warehouse);
router.get('/add-products', authMiddleware, Pages.Product);

//login, signup, logout post function
router.post('/signup', User.signup );
router.post('/login', User.login );
router.post('/logout',authMiddleware, User.logOut );


// products  Api
router.post('/products',authMiddleware, Products.products );
router.get('/products', authMiddleware, Products.getProducts);

//WareHouse  Api
router.post('/warehouse',authMiddleware, Warehouse.warehouse);
router.get('/warehouse',authMiddleware, Warehouse.getWarehouse);


//Stock  Api
router.post('/stock',authMiddleware, Stock.stock);
router.get('/stock',authMiddleware, Stock.getStock);


//State  Api
router.post('/states',authMiddleware, State.states);
router.get('/states',authMiddleware, State.getStates);

//Orders  Api
router.post('/order',authMiddleware, Order.order);
router.get('/order',authMiddleware, Order.getOrder);

//Customer  Api
router.post('/customers',authMiddleware, Order.customers);
router.get('/customers',authMiddleware, Order.getCustomers);



module.exports = router;