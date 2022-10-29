const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username:{type:String,required:true,unique:true},
        avatar:{type:String},
        adresse:{type:String},
        fullname:{type:String},
        sexe:{type:String},
        phone:{type:String},
        email:{type:String,unique:true},
        password:{type:String,required:true},
        isAdmin:{type:Boolean,default:false},
        // createdAt:Date.now() else we can use timestamps
    },
    {timestamps:true}
)
module.exports = mongoose.model("User",UserSchema)