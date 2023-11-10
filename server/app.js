// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51O98QCSACaXpHsJlm0RTcHoh3ASApUmrIXw68qJCiiJrecg67E6pny4OYUE0awdyuDldvoJIW50Zw0MHUTZdJKC200UUL03OfA"
);
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

// checkout api
app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
        images: [product.imgdata],
      },
      unit_amount: product.price * 100,
    },
    quantity: product.qnty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://kumarfertilizer.netlify.app/success",
    cancel_url: "https://kumarfertilizer.netlify.app/cancel",
  });

  res.json({ id: session.id });
});

app.listen(7000, () => {
  console.log("server start");
});
