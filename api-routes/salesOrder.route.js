const express = require('express');
const salesOrderController = require('../controllers/salesOrders.controller');
const router = express.Router();
const { ensureAuthenticated } = require('../controllers/auth.controller');
const {auth} = require('../controllers/jwt.controller')

router.post("/", auth, salesOrderController.addSalesOrder);
router.get("/", auth, salesOrderController.getSalesOrders);
router.get("/s", auth, salesOrderController.getSalesOrder);
router.put('/updateProcessing', auth, salesOrderController.updateSalesOrderProcessing);
router.delete('/delete', auth, salesOrderController.deleteSalesOrder);

module.exports = router;
