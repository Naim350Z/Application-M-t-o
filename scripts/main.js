import tabJoursEnOrdre from "./Utilitaire/gestionTemps.js";
console.log("Depuis main js " + tabJoursEnOrdre);

const CLEAPI = "8d9e4db8c3a5c6856c5690b4eb549c2e";
let resultatsAPI;
const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const heure = document.querySelectorAll(".heure-nom-prevision");
const tempsPourH = document.querySelectorAll(".heure-prevision-valeur");
const joursDiv = document.querySelectorAll(".jour-prevision-nom");
const tempJoursDiv = document.querySelectorAll(".jour-prevision-temp");
const ImgIcone = document.querySelector(".logo-meteo");
const chargementContainer = document.querySelector(".overlay-icone-chargement");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      //   console.log(position);
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      AppelAPI(long, lat);
    },
    () => {
      alert(
        `Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer !`
      );
    }
  );
}
function AppelAPI(long, lat) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultatsAPI = data;
      console.log(resultatsAPI);
      temps.innerText = resultatsAPI.current.weather[0].description;
      //voyage dans le chemin relatif de l'api
      temperature.innerText = Math.round(resultatsAPI.current.temp) + "°";
      localisation.innerText = resultatsAPI.timezone;

      let heureActuelle = new Date().getHours();
      for (let i = 0; i < heure.length; i++) {
        let heureIncr = heureActuelle + i * 3;
        if (heureIncr > 24) {
          heure[i].innerText = `${heureIncr - 24} h`;
        } else if (heureIncr === 24) {
          heure[i].innerText = `00 h`;
        } else {
          heure[i].innerText = `${heureIncr} h`;
        }
      }
      for (let j = 0; j < tempsPourH.length; j++) {
        tempsPourH[j].innerText = `${Math.round(
          resultatsAPI.hourly[j * 3].temp
        )}°`;
      }

      for (let k = 0; k < tabJoursEnOrdre.length; k++) {
        joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0, 3);
        //slice (0,3) prendre les 3 premiers caract des jours
      }
      for (let m = 0; m < 7; m++) {
        tempJoursDiv[m].innerText = `${Math.round(
          resultatsAPI.daily[m + 1].temp.day
        )}°`;
        //temps par jour
      }
      if (heureActuelle >= 6 && heureActuelle < 21) {
        ImgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
      } else {
        ImgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`;
      }

      chargementContainer.classList.add("disparition");
      //icone dynamique
    });
}
