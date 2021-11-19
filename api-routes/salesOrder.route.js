const express = require('express');
const salesOrderController = require('../controllers/salesOrders.controller');
const router = express.Router();
const { ensureAuthenticated } = require('../controllers/auth');

router.post("/", ensureAuthenticated, salesOrderController.addSalesOrder);
router.get("/", ensureAuthenticated, salesOrderController.getSalesOrders);
router.get("/s", ensureAuthenticated, salesOrderController.getSalesOrder);
router.put('/updateProcessing', ensureAuthenticated, salesOrderController.updateSalesOrderProcessing);
router.delete('/delete', ensureAuthenticated, salesOrderController.deleteSalesOrder);

module.exports = router;
