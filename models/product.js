const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title:{type:String,required:true,unique:true},
        desc:{type:String,unique:true,required:true},
        img:{type:String,required:true},
        categories:{type:Array,required:true},
        inStock:{type:Boolean,default:true},
        size:{type:Array},
        color:{type:Array},
        price:{type:Number,required:true},

        // createdAt:Date.now() else we can use timestamps
    },
    {timestamps:true}
)
module.exports = mongoose.model("Product",ProductSchema)