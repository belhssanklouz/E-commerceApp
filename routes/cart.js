const router = require("express").Router();
const cart = require("../models/cart");
const { verifyToken, verifyTokenAndAutorisation, verifyTokenAndAdmin } = require("./verifyToken");
//Create

router.post('/addcart',verifyToken,async (req,res)=>{
    const newCart = new cart (req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update
router.put('/:id',verifyTokenAndAutorisation, async(req,res)=>{

    try {
        const updatedCart = await cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete
router.delete('/:id',verifyTokenAndAutorisation, async(req,res)=>{
    try {
        await cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Product deleted succesfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get user cart
router.get('/find/:userid',verifyTokenAndAutorisation, async(req,res)=>{
    try {
        const Cart = await cart.findOne({userId : req.params.userid})
        res.status(200).json(Cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all products
router.get('/getallcarts',verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new;
    try {
        let carts;
       if(query){
            carts = await cart.find().sort({createdAt :-1}).limit(5);
       }else{
           carts = await cart.find();
       }
       res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;