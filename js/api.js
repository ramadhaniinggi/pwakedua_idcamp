const base_url = "https://api.football-data.org/v2";
const option = {
  headers: {
    "X-Auth-Token": "186bb29cc7cc49bba2d2aeea03cdb785",
  },
};

//! code yg dipanggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log(`error: ${response.status}`);
    // method reject() utk panggil blok catch
    return Promise.reject(new Error(response.statusText));
  } else {
    // ubah objek jd promise agar bisa di-then-kan
    return Promise.resolve(response);
  }
}

//! code utk memparsing json menjadi array js
function json(response) {
  return response.json();
}

//! code utk handle kesalahan di blok catch
function error(error) {
  // parameter error berasal dr Promise.reject()
  console.log(`error: ${error}`);
}

//! code utk standings request data json
function getStandingLists() {
  if ("caches" in window) {
    caches
      .match(
        `${base_url}/competitions/2014/standings?standingType=TOTAL`,
        option
      )
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let standingsHTML = "";
            data.standings[0].table.forEach(function (stand) {
              standingsHTML += `
              <div class="col l4 m4 s12">
              <div class="card small hoverable">
                <div class="card-image waves-effect waves-block waves-light">
                  <img alt="logo team ${
                    stand.team.name
                  }" class="activator imgClub" src="${stand.team.crestUrl.replace(
                /^http:\/\//i,
                "https://"
              )}" />
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4"
                    >${stand.team.name}<i class="material-icons right"
                      >more_vert</i
                    ></span
                  >
                  <p class="flow-text">Position ${stand.position}</a></p>
                </div>
                <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4"
                    >${
                      stand.team.name
                    }<i class="material-icons right">close</i></span
                  >
                  <p>
                    played games ${stand.playedGames} <br>
                    won ${stand.won} <br>
                    draw ${stand.draw} <br>
                    lost ${stand.lost} <br>
                    points ${stand.points} <br>
                    goals for ${stand.goalsFor} <br>
                    goals against ${stand.goalsAgainst} <br>
                    goal difference ${stand.goalDifference} <br>
                  </p>
                </div>
              </div>
            </div>
      `;
            });
            // sisipkan komponen card ke dlm element id content
            document.getElementById("standings").innerHTML = standingsHTML;
          });
        }
      });
  }
  fetch(`${base_url}/competitions/2014/standings?standingType=TOTAL`, option)
    .then(status)
    .then(json)
    .then(function (data) {
      // objek/array js dr response.json() masuk lwt data
      let standingsHTML = "";
      data.standings[0].table.forEach(function (stand) {
        standingsHTML += `
        <div class="col l4 m4 s12">
        <div class="card small hoverable">
          <div class="card-image waves-effect waves-block waves-light">
            <img alt="logo team ${
              stand.team.name
            }" class="activator imgClub" src="${stand.team.crestUrl.replace(
          /^http:\/\//i,
          "https://"
        )}" />
           </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4"
              >${stand.team.name}<i class="material-icons right"
                >more_vert</i
              ></span
            >
            <p>Position ${stand.position}</p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4"
              >${stand.team.name}<i class="material-icons right">close</i></span
            >
            <p>
              played games ${stand.playedGames} <br>
              won ${stand.won} <br>
              draw ${stand.draw} <br>
              lost ${stand.lost} <br>
              points ${stand.points} <br>
              goals for ${stand.goalsFor} <br>
              goals against ${stand.goalsAgainst} <br>
              goal difference ${stand.goalDifference} <br>
            </p>
          </div>
        </div>
      </div>
`;
      });
      // sisipkan komponen card ke dlm element id content
      document.getElementById("standings").innerHTML = standingsHTML;
      // document.getElementById("loadingnya").classList.remove("active");
    })
    .catch(error);
}

//! match list request data json
function getMatchLists() {
  if ("caches" in window) {
    caches
      .match(`${base_url}/competitions/2014/matches?status=SCHEDULED`, option)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let matchesHTML = "";
            data.matches.forEach(function (matched) {
              matchesHTML += `
              <li class="collection-item">
              <div>
                <h6>${matched.utcDate}</h6>
                <p>${matched.homeTeam.name} <br/> VS <br/> ${matched.awayTeam.name}</p>
              </div>
            </li>
              `;
            });
            // sisipkan komponen card ke dlm element id content
            document.getElementById("matches").innerHTML = matchesHTML;
          });
        }
      });
  }
  fetch(`${base_url}/competitions/2014/matches?status=SCHEDULED`, option)
    .then(status)
    .then(json)
    .then(function (data) {
      // objek/array js dr response.json() masuk lwt data
      let matchesHTML = "";
      data.matches.forEach(function (matched) {
        matchesHTML += `
        <li class="collection-item matchItem">
        <div>
          <h6>${matched.utcDate}</h6>
          <p>${matched.homeTeam.name} <br/> VS <br/> ${matched.awayTeam.name}</p>
        </div>
      </li>
        `;
      });
      // sisipkan komponen card ke dlm element id content
      document.getElementById("matches").innerHTML = matchesHTML;
    })
    .catch(error);
}

function getTeamLists() {
  if ("caches" in window) {
    caches
      .match(`${base_url}/competitions/2014/teams/`, option)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let teamsHTML = "";
            data.teams.forEach(function (teams) {
              teamsHTML += `
              <div class="col m6 l6 s12 offset-m3 offset-l3">
        <div class="card">
          <div class="card-image">
            <img class="imgClub" src="${teams.crestUrl.replace(
              /^http:\/\//i,
              "https://"
            )}" alt="logo team ${teams.name}" />
            </div>
            <div class="card-content">
            <p class="card-title">${teams.name}</p>
            <p>
              ${teams.shortName} (${teams.tla}) <br/> address ${
                teams.address
              }, (venue ${teams.venue})
            </p>
          </div>
          <div class="card-action">
            <a href="./team.html?id=${teams.id}">Read More</a>
          </div>
        </div>
      </div>

              `;
            });
            // sisipkan komponen card ke dlm element id content
            document.getElementById("teams").innerHTML = teamsHTML;
          });
        }
      });
  }
  fetch(`${base_url}/competitions/2014/teams/`, option)
    .then(status)
    .then(json)
    .then(function (data) {
      // objek/array js dr response.json() masuk lwt data
      let teamsHTML = "";
      data.teams.forEach(function (teams) {
        teamsHTML += `
        <div class="col m6 l6 s12 offset-m3 offset-l3">
        <div class="card">
          <div class="card-image">
            <img class="imgClub" src="${teams.crestUrl.replace(
              /^http:\/\//i,
              "https://"
            )}" alt="logo team ${teams.name}" />
            </div>
            <div class="card-content">
            <p class="card-title">${teams.name}</p>
            <p>
              ${teams.shortName} (${teams.tla}) <br/> address ${
          teams.address
        }, (venue ${teams.venue}) 
            </p>
          </div>
          <div class="card-action">
            <a href="./team.html?id=${teams.id}">Read More</a>
          </div>
        </div>
      </div>

        `;
      });
      // sisipkan komponen card ke dlm element id content
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    // ambil nilai query parameter
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches
        .match(`${base_url}/teams/${idParam}`, option)
        .then(function (response) {
          if (response) {
            response.json().then(function (data) {
              // objek js dr response.json() masuk lwt variable data
              console.log(data);
              let teamHTML = `
            <p class="card-title">${data.name} Squad List</p>
            `;
              data.squad.forEach(function (detail) {
                teamHTML += `
              <div class="col l4 m6 s12 ">
                      <div class="card hoverable">
                        <div class="card-content">
                          <p><i class="tiny material-icons">account_circle</i> ${detail.name}</p>
                          <p><i class="tiny material-icons">work</i> ${detail.position}</p>
                          <p><i class="tiny material-icons">cake</i> ${detail.dateOfBirth}</p>
                          <p><i class="tiny material-icons">location_city</i> ${detail.countryOfBirth}</p>
                          <p><i class="tiny material-icons">flag</i> ${detail.nationality}</p>
                          <p><i class="tiny material-icons">assignment_ind</i> ${detail.shirtNumber}</p>
                          <p><i class="tiny material-icons">label
                          </i> ${detail.role}</p>
                        </div>
                      </div>
                    </div>
      
              `;
              });
              document.getElementById("teamDetail").innerHTML = teamHTML;
              //  kirim objek data hasil parsing json agar bisa disimpan ke indexed db
              resolve(data);
            });
          }
        });
    }

    fetch(`${base_url}/teams/${idParam}`, option)
      .then(status)
      .then(json)
      .then(function (data) {
        // objek/array js dr response.json() masuk lwt data
        console.log(data);
        let teamHTML = `
      <p class="card-title">${data.name} Squad List</p>
      `;
        data.squad.forEach(function (detail) {
          teamHTML += `
        <div class="col l4 m6 s12 ">
                <div class="card hoverable">
                  <div class="card-content">
                    <p><i class="tiny material-icons">account_circle</i> ${detail.name}</p>
                    <p><i class="tiny material-icons">work</i> ${detail.position}</p>
                    <p><i class="tiny material-icons">cake</i> ${detail.dateOfBirth}</p>
                    <p><i class="tiny material-icons">location_city</i> ${detail.countryOfBirth}</p>
                    <p><i class="tiny material-icons">flag</i> ${detail.nationality}</p>
                    <p><i class="tiny material-icons">assignment_ind</i> ${detail.shirtNumber}</p>
                    <p><i class="tiny material-icons">label
                    </i> ${detail.role}</p>
                  </div>
                </div>
              </div>

        `;
        });
        // sisipkan komponen card ke dlm element id content
        document.getElementById("teamDetail").innerHTML = teamHTML;
      })
      .catch(error);
  });
}

function getSavedTeams() {
  getAll().then(function (teams) {
    console.log(teams);
    // menyusun komponen card artikel scr dinamis
    let teamHTML = "";
    teams.forEach(function (team) {
      teamHTML += `
      <div class="col m6 l6 s12 offset-m3 offset-l3">
        <div class="card">
          <div class="card-image">
            <img class="imgClub" src="${team.crestUrl.replace(
              /^http:\/\//i,
              "https://"
            )}" alt="logo team ${team.name}" />
            </div>
            <div class="card-content">
            <p class="card-title">${team.name}</p>
            <p>
              ${team.shortName} (${team.tla}) <br/> address ${
        team.address
      }, (venue ${team.venue}) 
            </p>
          </div>
          <div class="card-action">
            <a href="./team.html?id=${team.id}&saved=true">Read More</a>
          </div>
        </div>
      </div>
      `;
    });

    // sisipkan komponen card ke dalam elemen dgn id body-content
    document.getElementById("teamsSaved").innerHTML = teamHTML;
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function (team) {
        resolve(team);
      });
  });
}

function getSavedTeamsById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(idParam).then(function (teams) {
    console.log(teams);
    let teamHTML = `
            <p class="card-title">${teams.name} Squad List</p>
            `;
    teams.forEach(function (team) {
      teamHTML += `
              <div class="col l4 m6 s12 ">
                      <div class="card hoverable">
                        <div class="card-content">
                          <p><i class="tiny material-icons">account_circle</i> ${team.name}</p>
                          <p><i class="tiny material-icons">work</i> ${team.position}</p>
                          <p><i class="tiny material-icons">cake</i> ${team.dateOfBirth}</p>
                          <p><i class="tiny material-icons">location_city</i> ${team.countryOfBirth}</p>
                          <p><i class="tiny material-icons">flag</i> ${team.nationality}</p>
                          <p><i class="tiny material-icons">assignment_ind</i> ${team.shirtNumber}</p>
                          <p><i class="tiny material-icons">label
                          </i> ${team.role}</p>
                        </div>
                      </div>
                    </div>

                    
      
              `;
    });

    // sisipkan komponen card dalam elemen dengan id body-content
    document.getElementById("teamDetail").innerHTML = teamHTML;
  });
}
