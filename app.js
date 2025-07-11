require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { logIncomingRequests } = require("./middlewares/requests");
const cron = require('node-cron');
const connectMongoDB = require("./config/database");

const notifyExpiredProducts = require("./services/cron");
const { ProductRouter, SubscribeSeviceRouter, UserRouter } = require("./routes");

const app = express();

app.use(logIncomingRequests);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

cron.schedule('*/10 * * * *', () => {
  console.log('Running expired product check every 2 minutes...');
  notifyExpiredProducts();
});


const PORT = process.env.PORT;

app.use('/api/user',UserRouter);
app.use('/api/product', ProductRouter);
app.use('/api/subscribe-services', SubscribeSeviceRouter);

connectMongoDB();

app.listen(PORT, () => {
  console.log("Server started..");
});
