const router = require("express").Router();
const product = require("../models/product");
const { verifyTokenAndAdmin,verifyTokenAndAutorisation } = require("./verifyToken");

//Create

router.post('/addproduct',verifyTokenAndAdmin,async (req,res)=>{
    const newProduct = new product (req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update
router.put('/:id',verifyTokenAndAdmin, async(req,res)=>{

    try {
        const updatedProduct = await product.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete
router.delete('/:id',verifyTokenAndAdmin, async(req,res)=>{
    try {
        await product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product deleted succesfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get product
router.get('/find/:id', async(req,res)=>{
    try {
        const productt = await product.findById(req.params.id)
        res.status(200).json(productt)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all products
router.get('/getallproducts', async(req,res)=>{
    const query = req.query.new;
    const qCategories = req.query.category
    try {
        let products;
       if(query){
            products = await product.find().sort({createdAt :-1}).limit(5);
       }else if(qCategories){
           products = await product.find({categories : {$in: [qCategories]}})
       }else{
           products = await product.find();
       }
       res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;