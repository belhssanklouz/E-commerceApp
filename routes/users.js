const router = require("express").Router();
const {verifyToken,verifyTokenAndAutorisation, verifyTokenAndAdmin} = require('./verifyToken');
const cryptoJS = require('crypto-js');
const User = require("../models/user");

//Update
router.put('/:id',verifyTokenAndAutorisation, async(req,res)=>{
    if(req.body.password){
        req.body.password = cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/adduser',verifyTokenAndAdmin, async(req,res)=>{
    const newUser = new User({
        username:req.body.username,
        avatar:req.body.avatar,
        adresse:req.body.adresse,
        fullname:req.body.fullname,
        sexe:req.body.sexe,
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        email:req.body.email,
        password:cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete
router.delete('/:id',verifyTokenAndAutorisation, async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted succesfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get user
router.get('/find/:id',verifyTokenAndAdmin, async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all user
router.get('/getallusers',verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get users stats
router.get('/stats',verifyTokenAndAdmin, async(req,res)=>{

    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {

        const data = await User.aggregate([
            {$match:{createdAt:{$gte: lastYear} } },
            {$project : {
                month:{$month : '$createdAt'},
            }},
            {$group:{
                _id:"$month",
                total : {$sum: 1}
            }}
        ])
        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;