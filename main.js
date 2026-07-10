const express = require("express");
const app = express();
require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const dbConnection = require("./config/dbConnection");
const authenticationRoutes = require("./routes/auth.routes");
const customerRoutes = require("./routes/customer.routes");

app.use(express.json());
app.use("/auth", authenticationRoutes);
app.use("/customers", customerRoutes);

dbConnection();
app.listen(process.env.port, () => {
    console.log(`Server up and running on ${process.env.port}`);
});