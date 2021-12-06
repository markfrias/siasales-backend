const { SalesOrder } = require("../models/salesOrder");

const addSalesOrder = async(req, res) => {
    // Assign field data to variables
    
    try {

        let items = req.body.tableItems;
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
                shippingMethod: req.body.shippingMethod,
                shippingVehicle: req.body.shippingVehicle,
                shippingDate: new Date(req.body.shippingDate),
                deliveryDate: new Date(req.body.deliveryDate),
                paymentChoice: req.body.paymentChoice,
                billingStreetAddress: req.body.billingStreetAddress,
                billingCity: req.body.billingCity,
                billingProvince: req.body.billingProvince,
                shippingStreetAddress: req.body.shippingStreetAddress,
                shippingCity: req.body.shippingCity,
                shippingProvince: req.body.shippingProvince
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
            res.json({message: "Sales order added", status: "Success", small});
            
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
        console.log(req.query.id);
        const aggregateValues = await  SalesOrder.aggregate([
            {
                $match: {_id: req.query.id}  
            },
            /*{   
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
            }*/
        ])
        console.log(aggregateValues)
        SalesOrder.findById(req.query.id, (err, docs) => {
            
            if (err) return res.json({message: "Cannot fetch specific user", status: "User does not exist"});
            res.json({obj: docs, agg: aggregateValues, status: "Success"})
        })

        
    }
    catch (err) {
        console.error(err);
        res.json({message: "We can't fetch your requests at the moment", status: "Error"})
    }
    
}

// Updates the processing status of the sales order
const updateSalesOrderProcessing = async(req, res) => {
    SalesOrder.updateOne({_id: req.query.id}, {
        processingStatus: req.query.processingStatus
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