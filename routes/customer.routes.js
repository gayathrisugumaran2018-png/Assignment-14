const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer.controller");
const authMiddleware = require("../middleware/auth.middleware");

// 1. Modhalla list edukuradha podunga
router.get("/", authMiddleware, customerController.getCustomers);

// 2. Specific routes-a eppovumee dynamic ID-ku MUNNADI ezhudhanum
router.post("/create", authMiddleware, customerController.createCustomer);

// 3. Dynamic ID routes-a eppovumee KEEZHA (Kadaisila) podanum
router.get("/:id", authMiddleware, customerController.getCustomerById);
router.put("/:id", authMiddleware, customerController.updateCustomer);
router.delete("/:id", authMiddleware, customerController.deleteCustomer);

module.exports = router;