// meminta idb untuk membuka database brnm chiggu app
let dbPromised = idb.open("chiggu-app", 1, function (upgradeDb) {
  // mendefinisikan object store baru brmn teams
  let articleObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  articleObjectStore.createIndex("name", "name", {
    unique: false,
  });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      console.log(team);
      //   argumeennya team.result karena objek team memiliki nested object
      store.add(team);
      return tx.complete;
    })
    .then(function () {
      console.log("detail team berhasil disimpan");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function deleteForLater(teamId) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        console.log(teamId);
        store.delete(teamId.id);
        return tx.complete;
      })
      .then(function () {
        console.log("detail team berhasil dihapus");
      });
  });
}
