import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      message: "User registered successfully",
      token,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId); // <-- FIXED

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log("Credits error:", error);
    res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const razorpayPayment = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing fields" });
    }
    let plan, amount, credits, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 50;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 100;
        break;

      case "Business":
        plan = "Business";
        credits = 1000;
        amount = 250;
        break;

      default:
        return res.json({ success: false, message: "Invalid plan" });
    }
    date = Date.now();

    const transactionData = {
      userId,
      plan,
      credits,
      amount,
      date,
    };
    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: newTransaction._id.toString(),
    };
    await razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: err.message });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const transactionData = await transactionModel.findById(orderInfo.receipt);

      if (transactionData.payment) {
        return res.json({
          success: false,
          message: "Transaction already processed",
        });
      }

      const userData = await userModel.findById(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;

      await userModel.findByIdAndUpdate(transactionData.userId, {
        creditBalance,
      });

      await transactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      res.json({ success: true, message: "Payment successful, Credits Added" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, userCredits, razorpayPayment, verifyRazorpay }