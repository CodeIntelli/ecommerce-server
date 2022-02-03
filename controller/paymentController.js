import { STRIPE_SECRET_KEY, STRIPE_API_KEY } from "../config";

const Stripe = require("stripe")(STRIPE_SECRET_KEY);

const paymentController = {
  async processPayment(req, res, next) {
    try {
      const myPayment = await Stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
          company: "Fossa",
        },
      });

      res
        .status(200)
        .json({ success: true, client_secret: myPayment.client_secret });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  },
  async sendStripeAPIKey(req, res, next) {
    res.status(200).json({ stripeApiKey: STRIPE_API_KEY });
  },
};

export default paymentController;
