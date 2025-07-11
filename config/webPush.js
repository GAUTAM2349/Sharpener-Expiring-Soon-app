const webPush = require("web-push");

webPush.setVapidDetails(
  process.env.MY_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

module.exports = webPush;
