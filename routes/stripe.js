const router = require('express').Router();
const stripe = require('stripe')("sk_test_51KunhbEp0WoqrxhCaQ07o7xxasyMrx20IrF1LmkqplsGVZ8ifey2DtTcdXfaWqARhPpydJP94UeABk2yrueSlt6F00bFJ1w7xD");

router.post('/payment',(req,res)=>{
    console.log(process.env.STRIPE_KEY)
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd"
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        }else{
            res.status(200).json(stripeRes)

        }
    })
})

module.exports = router