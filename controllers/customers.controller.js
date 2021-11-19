const { Customer } = require("../models/customer");
const getUsers = async(req, res) => {
    Customer.find({}, (err, docs) => {
        if (docs) {return res.json(docs)}
        console.log("Request yeah")
        res.json({message: "Error", error: err});
    })
}

const addUser = async(req, res) => {
    // Assign field data to variables
    let customerDetails = {
        companyName: req.body.companyName,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        province: req.body.province,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        industry: req.body.industry,
        status: req.body.status
    }
    Customer.create(customerDetails, (err, small) => {
        if (err) return res.json({message: err, status: "Error"});
        res.json({message: "Customer added", status: "Success"});
    })
}

// Fetches specific customer by ID and returns customer details
const getUser = async(req,res) => {
    Customer.findById(req.query.id, (err, docs) => {
        if (err) return res.json({message: err, status: "Error"});
        res.json(docs);
    })
}

module.exports = {
    getUsers, addUser, getUser
}