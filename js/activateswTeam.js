// mendaftarkan service worker
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

// request api
document.addEventListener("DOMContentLoaded", function () {
  let urlParams = new URLSearchParams(window.location.search);
  let isFromSaved = urlParams.get("saved");
  let isToDelete = urlParams.get("id");

  const item = getTeamById();
  const save = document.getElementById("save");
  const btnDelete = document.getElementById("deleted");

  if (isFromSaved) {
    save.style.display = "none";
    btnDelete.style.display = "block";
    getSavedTeamsById();
  } else {
    getTeamById();
  }
  save.onclick = function () {
    console.log("Tombol FAB Save di klik.");
    item.then(function (team) {
      saveForLater(team);
    });
  };

  btnDelete.onclick = function () {
    console.log("Tombol FAB Delete di klik.");
    item.then(function (isToDelete) {
      deleteForLater(isToDelete);
    });
  };
});
