const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user:{type:Object,required:false},
        userType:{type:String,required:true,default:'Guest'},
        products:[
            {
                productId:{type:String},
                productImg:{type:String},
                productName:{type:String},
                quantity:{type:Number,default:1},
                price:{type:Number},
                total:{type:Number},
                size:{type:String},
                color:{type:String}
            }
        ],
        amount:{type:Number,required:true},
        address:{type:Object,required:true},
        paymentMethod:{type:Object,required:true},
        status:{type:String,default:"Pending"}
        

        // createdAt:Date.now() else we can use timestamps
    },
    {timestamps:true}
)
module.exports = mongoose.model("Order",OrderSchema)