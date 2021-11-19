module.exports = (app) => { 
    const express = require('express');
    const router = express.Router();
    
    //require controler

    const controller = require('../controller/OrderDetails-Controller')


    //app.use('/api',controller.create)

    //app.post('/', controller.createOrderDetails );


    module.exports = router;
        
}
