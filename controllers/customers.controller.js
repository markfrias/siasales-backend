const { Customer } = require("../models/customer");
const getUsers = async(req, res) => {
    Customer.find({}, (err, docs) => {
        if (docs) {return res.json(docs)}
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

module.exports = {
    getUsers, addUser,
}