const User = require("../models/User");


const subscribePushService = async (req, res) => {
  const subscription = req.body;
  const userId = '686eca8b764eb6f8d9374c17'; 
  console.log("reached push subscription controller");

  try {
    await User.findByIdAndUpdate(
      userId,
      { pushSubscription: subscription },
      { new: true }
    );

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to subscribe" });
  }
};


module.exports = { subscribePushService };
