const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

// @router POST /api/checkout
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No item in checkout" });
  }

  // Ensure req.user is defined
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    });

    console.log(`Checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.log("Error creating checkout session: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/checkout/:id/pay
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paidAt = Date.now();
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      await checkout.save();
      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid payement Status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/checkout/:id/finalize

router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // Create final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItem: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      console.log(finalOrder.orderItems);

      //Mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();
      // Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout already finalized" });
    } else {
      res.status(400).json({ message: "Checkout is not paid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
