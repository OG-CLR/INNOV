// --- Gestion des cookies ---
function setCookie(name, value, days) {
  var date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  var expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  name = name + "=";
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length);
    }
  }
  return "";
}

function hasVotedAlready() {
  return getCookie("hasVoted") === "true";
}

// --- Envoi du vote via Google Forms ---
function sendVote(answer) {
  var formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf6g7OSR0P0sQ89bHKDY2zxRjLCVcmf2eahnQXQms62vN58SQ/formResponse";

  // Redirection directe sans nouvelle fenêtre
  var form = document.createElement("form");
  form.method = "POST";
  form.action = formUrl;
  form.target = "_blank";

  var input = document.createElement("input");
  input.type = "hidden";
  input.name = "entry.1534549768";
  input.value = answer;

  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
}

// --- Initialisation lorsque le DOM est chargé ---
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("interestButton").addEventListener("click", function (e) {
    e.preventDefault();

    if (hasVotedAlready()) {
      alert("Vous avez déjà voté, merci !");
      return;
    }

    console.log("Bouton 'Ça m’intéresse' cliqué, envoi du vote...");

    // Envoi d'un événement à Google Analytics via Google Tag Manager
    dataLayer.push({
      'event': 'vote_interested',
      'eventCategory': 'survey',
      'eventAction': 'click',
      'eventLabel': 'Ça m’intéresse'
    });

    // Définit le cookie pour éviter les votes multiples
    setCookie("hasVoted", "true", 365);

    // Envoi du vote vers Google Forms
    sendVote("Ça m’intéresse");
  });
});
