const router = require("express").Router();
const User = require('../models/user');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


//Register 
router.post('/register', async(req,res) => {

    const username = await User.findOne({
        username:req.body.username
    })

    const email = await User.findOne({
        email:req.body.email
    })

    if(username!==null)
    {
        res.status(409).json('username already exist');
        return;
    }
    else if(email!==null)
    {
        res.status(409).json('email already exist');
        return;
    }
    else
    {
        const newUser = new User({
            fullname:req.body.fullname,
            username:req.body.username,
            email:req.body.email,
            password:cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        });
        const accessToken = jwt.sign({
            id:newUser._id,
            isAdmin:newUser.isAdmin
        },process.env.JWT_SEC,{expiresIn:"3d"})
        try {
            const savedUser = await newUser.save();
            const {password,isAdmin,...otherData} = savedUser._doc
            res.status(201).json({...otherData,accessToken});
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
});

//LOGIN
router.post('/login', async (req,res)=>{
    try {
        const user = await User.findOne({
            username:req.body.username,
        })

        if(!user){
            res.status(401).json('Wrong user');
            return;
        }

        const hashedPassword = cryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);

        const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.JWT_SEC,{expiresIn:"3d"})

        const {password,...others} = user._doc;
        originalPassword !== req.body.password ?

        res.status(401).json('wrong Password'):

        res.status(200).json({...others,accessToken});
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/admin/login', async (req,res)=>{
    try {
        const user = await User.findOne({
            username:req.body.username,
        })

        if(!user){
            res.status(401).json('Wrong user');
            return;
        }

        const hashedPassword = cryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);

        const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);
        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.JWT_SEC,{expiresIn:"3d"});

        const {password,...others} = user._doc;

        originalPassword == req.body.password && user.isAdmin ?
        res.status(200).json({...others,accessToken}):
         res.status(401).json('wrong Password')
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;