const express = require('express');
const router = express.Router();

const register = require('../public/javascripts/controls/register');
const logout = require('../public/javascripts/controls/logout');
const login = require('../public/javascripts/controls/login');
const dashboard = require('../public/javascripts/controls/dashboard');
const orders = require('../public/javascripts/controls/orders');
const products = require('../public/javascripts/controls/products');
const insert_order = require('../public/javascripts/controls/insert_order');
const insert_product = require('../public/javascripts/controls/insert_product');

router.post(`/register`, register);
router.post(`/login`, login);
router.delete(`/logout`, logout);
router.get(`/dashboard`, dashboard);

router.get(`/orders`, orders);
router.post(`/insert_order`, insert_order);

router.get(`/products`, products);
router.post(`/insert_product`, insert_product);

module.exports = router;