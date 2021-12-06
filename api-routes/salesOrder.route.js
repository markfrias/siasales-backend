const express = require('express');
const salesOrderController = require('../controllers/salesOrders.controller');
const router = express.Router();

router.post("/", salesOrderController.addSalesOrder);
router.get("/", salesOrderController.getSalesOrders);
router.get("/s", salesOrderController.getSalesOrder);
router.put('/updateProcessing', salesOrderController.updateSalesOrderProcessing);
router.delete('/delete', salesOrderController.deleteSalesOrder);

module.exports = router;