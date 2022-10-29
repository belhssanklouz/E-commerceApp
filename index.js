const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const dotEnv = require("dotenv")
const userRoute = require("./routes/users.js");
const authRoute = require('./routes/auth');
const productsRoute = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const paymentRouter = require('./routes/stripe');
const cors = require('cors')


dotEnv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB Connection succ"))
.catch((error)=>console.log(error))
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoute);
app.use('/api/users',userRoute);
app.use('/api/products',productsRoute);
app.use('/api/cart',cartRouter);
app.use('/api/orders',orderRouter);
app.use('/api/checkout',paymentRouter);

app.listen(process.env.PORT || 5000,()=>{
    console.log("backend server works")
})