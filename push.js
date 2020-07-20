const webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BDQXzm_in8zKCcJBobKbypgutd0Nq3xUZ48tPg-PyIwSZN7mod6bflBq-lTi7MDyAQgZlzCYDIcfNcnUTYVHqEw",
  privateKey: "gZlTTnQDHSUHytz6lJJxYFt_aGvOxeKtvKdaultV_Ns",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/c-3z1kdXCXk:APA91bHfmQrQOw1wmjj5tv_dBJAJMcI2qTd9h_1-LgdxF2bw_sHZ0vpKr_2Q1oOW9Fwj49nbnyaymNpngFI7NhDTiDo-3znmHIqTB-nRl48rDQMnXjRdYAZgDRMl45LsAmPt6geyVMxk",
  keys: {
    p256dh:
      "BL5aPEp+5EWfU95Vs5fqgOIsROKpgpGlD3lRL2f3p51/G3SdabUd92wJ/AnGeN9jypuYzrnZhVPe8aaE5mJgalM=",
    auth: "NI74qu+QZCj++g1HvCAZ5g==",
  },
};
let payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

const options = {
  gcmAPIKey: "499415448443",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
