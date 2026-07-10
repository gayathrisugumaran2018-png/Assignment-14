const Customer = require("../model/customer.model");

// Create Customer
const createCustomer = async (req, res) => {
    try {
        const { name, email, phone, company, address } = req.body;

        if (!name || !email || !phone || !company || !address) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const customer = await Customer.create({
            name,
            email,
            phone,
            company,
            address,
            createdBy: req.userId
        });

        res.status(201).json({
            message: "Customer created successfully",
            customer 
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Customers
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({
            createdBy: req.userId
        });

        res.status(200).json(customers);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Single Customer
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findOne({
            _id: req.params.id,
            createdBy: req.userId
        });

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json(customer);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Customer
const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOneAndUpdate(
            {
                _id: req.params.id,
                createdBy: req.userId
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json({
            message: "Customer updated successfully",
            customer
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Customer
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.userId
        });

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json({
            message: "Customer deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};