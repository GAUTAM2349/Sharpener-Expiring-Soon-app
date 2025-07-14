const User = require("../models/User");


const subscribePushService = async (req, res) => {
  
  const subscription = req.body;
  const userId = req.user?._id; 

  if(!userId) return res.status(403).json({message : "invalid userId"});
  

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


const unsubscribePushService = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(403).json({ message: "Invalid userId" });
  }

  try {
    await User.findByIdAndUpdate(
      userId,
      { $set: { pushSubscription: null } },
      { new: true }
    );
    console.log("UNSBSCRIBED");
    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (err) {
    console.error("Unsubscribe error:", err);
    res.status(500).json({ error: "Failed to unsubscribe" });
  }
};



module.exports = { subscribePushService, unsubscribePushService };


