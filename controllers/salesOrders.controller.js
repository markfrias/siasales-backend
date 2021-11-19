const { SalesOrder } = require("../models/salesOrder");

const addSalesOrder = async(req, res) => {
    // Assign field data to variables
    
    try {

        let items = req.body.items;
        let itemz = [];
        console.log(items)
        items.forEach((data) => {
            const obj = {
                itemId: data.itemId,
                itemName: data.itemName,
                itemDescription: data.itemDescription,
                quantity: data.quantity,
                unitPrice: data.unitPrice
            }
            itemz.push(obj);
        })            
        
            
        
       
        let salesOrderDetails = {
            customerId: req.body.customerId,
            customerRepresentativeId: req.body.customerRepresentativeId,
            salesPersonId: req.body.salesPersonId,
            shippingDetails: {
                shippingMethod: req.body.shippingDetails.shippingMethod,
                shippingVehicle: req.body.shippingDetails.shippingVehicle,
                shippingDate: new Date(req.body.shippingDetails.shippingDate),
                deliveryDate: new Date(req.body.shippingDetails.deliveryDate),
                paymentChoice: req.body.shippingDetails.paymentChoice,
                billingStreetAddress: req.body.shippingDetails.billingStreetAddress,
                billingCity: req.body.shippingDetails.billingCity,
                billingProvince: req.body.shippingDetails.billingProvince,
                shippingStreetAddress: req.body.shippingDetails.shippingStreeetAddress,
                shippingCity: req.body.shippingDetails.shippingCity,
                shippingProvince: req.body.shippingDetails.shippingProvince
            },
            orderDetails : {
                discount: req.body.orderDetails.discount,
                taxRate: req.body.orderDetails.taxRate,
                otherFees: req.body.orderDetails.otherFees,
                shippingFee: req.body.orderDetails.shippingFee
            },
            items: itemz
           
            
           
        }
        console.log(salesOrderDetails)
        SalesOrder.create(salesOrderDetails, (err, small) => {
            if (err) return res.json({message: err, status: "Error"});
            res.json({message: "Sales order added", status: "Success"});
            
        })
    } catch (e) {
        console.error(e);
    }
    
}

const getSalesOrders = async(req, res) => {
    try {
        const aggregateValues = await  SalesOrder.aggregate([
            {
                $project: {
                    "subtotal": {
                        $reduce: {
                            input: "$items.unitPrice",
                            initialValue: 0,
                            in: {$add: ["$$value", "$$this"]}
                        }
                    },
                   
                        
                    "subtotalLDiscount": {
                       $let: {
                           vars: {
                               subtotal: {
                                $reduce: {
                                    input: "$items.unitPrice",
                                    initialValue: 0,
                                    in: {$add: ["$$value", "$$this"]}
                                }
                               }
                           },
                           in: {$subtract: ["$$subtotal", "$orderDetails.discount" ]}
                       }
                    },
                    "totalTax": {
                        $let: {
                            vars: {
                                taxRate: {$divide: ["$orderDetails.taxRate", 100]},
                                subtotal: {
                                    $reduce: {
                                        input: "$items.unitPrice",
                                        initialValue: 0,
                                        in: {$add: ["$$value", "$$this"]}
                                    }
                                   }
                            },
                            in : {$multiply: [{$subtract: ["$$subtotal", "$orderDetails.discount"]}, "$$taxRate"]}
                        }

                    },
                    "total": {
                       $let: {
                           vars: {
                            subtotal: {
                                $reduce: {
                                    input: "$items.unitPrice",
                                    initialValue: 0,
                                    in: {$add: ["$$value", "$$this"]}
                                }
                               },
                               taxRate: {$divide: ["$orderDetails.taxRate", 100]}
                           },
                           in: {$add: ["$orderDetails.otherFees" , "$orderDetails.shippingFee", {$subtract: ["$$subtotal", "$orderDetails.discount"]}, {$multiply: [{$subtract: ["$$subtotal", "$orderDetails.discount"]}, "$$taxRate"]},  ]}
                       }
                    }
                }
            }
        ])
        SalesOrder.find({}, (err, docs) => {
            if (err) return res.json({message: err, status: "Error"})
            res.json({obj:docs, agg: aggregateValues});
        })
    } catch (err) {
        console.error(err);
        res.json({message: "We can't fetch your requests at the moment"})
    }
}

// Fetches specific sales order by ID and returns specific sales order details
const getSalesOrder = async(req, res) => {
    try {
        const aggregateValues = await  SalesOrder.aggregate([
            {
                $match: {_id: req.body._id}  
            },
            {   
                $project: {
                    "_id": "$_id",
                    "subtotal": {
                        $reduce: {
                            input: "$items.unitPrice",
                            initialValue: 0,
                            in: {$add: ["$$value", "$$this"]}
                        }
                    },
                   
                        
                    "subtotalLDiscount": {
                       $let: {
                           vars: {
                               subtotal: {
                                $reduce: {
                                    input: "$items.unitPrice",
                                    initialValue: 0,
                                    in: {$add: ["$$value", "$$this"]}
                                }
                               }
                           },
                           in: {$subtract: ["$$subtotal", "$orderDetails.discount" ]}
                       }
                    },
                    "totalTax": {
                        $let: {
                            vars: {
                                taxRate: {$divide: ["$orderDetails.taxRate", 100]},
                                subtotal: {
                                    $reduce: {
                                        input: "$items.unitPrice",
                                        initialValue: 0,
                                        in: {$add: ["$$value", "$$this"]}
                                    }
                                   }
                            },
                            in : {$multiply: [{$subtract: ["$$subtotal", "$orderDetails.discount"]}, "$$taxRate"]}
                        }

                    },
                    "total": {
                       $let: {
                           vars: {
                            subtotal: {
                                $reduce: {
                                    input: "$items.unitPrice",
                                    initialValue: 0,
                                    in: {$add: ["$$value", "$$this"]}
                                }
                               },
                               taxRate: {$divide: ["$orderDetails.taxRate", 100]}
                           },
                           in: {$add: ["$orderDetails.otherFees" , "$orderDetails.shippingFee", {$subtract: ["$$subtotal", "$orderDetails.discount"]}, {$multiply: [{$subtract: ["$$subtotal", "$orderDetails.discount"]}, "$$taxRate"]},  ]}
                       }
                    }
                }
            }
        ])
        SalesOrder.findById(req.query.id, (err, docs) => {
            
            if (err) return res.json({message: "Cannot fetch specific user", status: "Error"});
            res.json({obj: docs, agg: aggregateValues})
        })

        
    }
    catch (err) {
        console.error(err);
        res.json({message: "We can't fetch your requests at the moment"})
    }
    
}

// Updates the processing status of the sales order
const updateSalesOrderProcessing = async(req, res) => {
    SalesOrder.updateOne({_id: req.body._id}, {
        processingStatus: req.body.processingStatus
    }, (err, writeOpResult) => {
        console.log(writeOpResult)
        if (err) res.json({message: "Error"})
        if (writeOpResult.modifiedCount > 0) {
            res.json({message: "Processing status updated", status: "Success"})
        } else {
            res.json({message: "Sales order doesn't exist", status: "Failed"})

        }
        
    })
}

// Finds and deletes a sales order by id
const deleteSalesOrder = async(req, res) => {
    try {
        SalesOrder.findOneAndDelete({_id: req.query.id}, (err, doc) => {
            if (err) return res.json({message: "Error", error: err})
            return res.json({message: "Item is deleted", status: "Success"})
        })
    } catch (err) {

    }
}


module.exports = {
    addSalesOrder, getSalesOrders, getSalesOrder, updateSalesOrderProcessing, deleteSalesOrder
}