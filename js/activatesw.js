//! mendaftarkan service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("pendaftaran serviceworker berhasil");
      })
      .catch(function () {
        console.log("pendaftaran serviceworker gagal");
      });
  });
} else {
  console.log("serviceworker belum didukung browser ini");
}

//!   periksa fitur notifikasi API
if ("Notification" in window) {
  requestPermission();
} else {
  console.error("browser tidak mendukung notifikasi");
}

//! meminta ijin menggunakan notifikasi API
function requestPermission() {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      console.log("fitur notifikasi tidak diijinkan");
      return;
    } else if (result === "default") {
      console.error("pengguna menutup kotak dialog permintaan ijin");
      return;
    }
    //   berlangganan pesan push melalui pushmanager
    if ("PushManager" in window) {
      navigator.serviceWorker.getRegistration().then(function (registration) {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "BDQXzm_in8zKCcJBobKbypgutd0Nq3xUZ48tPg-PyIwSZN7mod6bflBq-lTi7MDyAQgZlzCYDIcfNcnUTYVHqEw"
            ),
          })
          .then(function (subscribe) {
            console.log(
              "Berhasil melakukan subscribe dengan endpoint: ",
              subscribe.endpoint
            );
            console.log(
              "Berhasil melakukan subscribe dengan p256dh key: ",
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("p256dh"))
                )
              )
            );
            console.log(
              "Berhasil melakukan subscribe dengan auth key: ",
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("auth"))
                )
              )
            );
          })
          .catch(function (e) {
            console.error("Tidak dapat melakukan subscribe ", e.message);
          });
      });
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// {"publicKey":"BDQXzm_in8zKCcJBobKbypgutd0Nq3xUZ48tPg-PyIwSZN7mod6bflBq-lTi7MDyAQgZlzCYDIcfNcnUTYVHqEw","privateKey":"gZlTTnQDHSUHytz6lJJxYFt_aGvOxeKtvKdaultV_Ns"}

//! request api
document.addEventListener("DOMContentLoaded", function () {
  getStandingLists();
  getMatchLists();
  getTeamLists();
});
