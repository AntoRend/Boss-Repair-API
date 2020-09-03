const Stripe = require('stripe')
const express = require('express')
// import Stripe from 'stripe'

const router = express.Router()

const stripe = new Stripe('sk_test_51HMmJBD9aCBWPYFtXG1xUsIFgmfwiyrx1ZGCKxMs2J89KcNubD9LZKvAuMyjpYXexKGT4f0RNKGxodq1pCdACtYi00mjBkkMIS')

router.post('/', async (req, res) => {
  const { id, amount, description } = req.body

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description,
      payment_method: id,
      confirm: true
    })

    console.log(payment)

    return res.status(200).json({
      confirm: 'Success'
    })
  } catch (error) {

  }
})

module.exports = router

// AWS data
// user: AntoRend
// Access Key ID : AKIA4G2K3GO7XSW62YLC
// Secret access key: 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
// User ARN: arn:aws:iam::839286207423:user/AntoRend
// bucket ARN: arn:aws:s3:::bossrepairimages
