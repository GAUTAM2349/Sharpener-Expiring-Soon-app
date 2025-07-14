const webpush = require("web-push");
const Product = require("../models/Product");
const User = require("../models/User");

webpush.setVapidDetails(
  process.env.MY_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const notifyExpiredProducts = async () => {
  try {
    const today = new Date();

    const expiredProducts = await Product.find({
      expiry: { $lt: today },
    });

    if (!expiredProducts.length) {
      console.log("No expired products found today.");
      return;
    }

    console.log("Expired products:", expiredProducts);

    const users = await User.find({ pushSubscription: { $exists: true } });

    for (const user of users) {
      const userProducts = expiredProducts.filter(
        (product) => product.userId.toString() === user._id.toString()
      );

      if (!userProducts.length) continue; 

      const names = userProducts.map((p) => p.name).join(", ");
      const payload = JSON.stringify({
        title: "Expired Products",
        body: `Your expired products: ${names}`,
      });

      try {
        await webpush.sendNotification(
          user.pushSubscription.subscription,
          payload
        );
        console.log(`Notification sent to ${user.email}`);
      } catch (err) {
        console.error(`Failed to send notification to ${user.email}`, err);
      }
    }
  } catch (error) {
    console.error("Error checking expired products:", error);
  }
};

module.exports = notifyExpiredProducts;
