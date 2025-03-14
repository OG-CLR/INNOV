// --- Gestion des cookies ---
// Définit un cookie
function setCookie(name, value, days) {
  var date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  var expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Récupère la valeur d'un cookie
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

// Vérifie si l'utilisateur a déjà voté
function hasVotedAlready() {
  return getCookie("hasVoted") === "true";
}

// --- Envoi du vote via Google Forms ---
// Ouvre une nouvelle fenêtre et soumet automatiquement un formulaire POST vers Google Forms
function sendVote(answer) {
  var newWindow = window.open("", "_blank");
  newWindow.document.open();
  newWindow.document.write("<html><head><meta charset='UTF-8'></head><body>");
  newWindow.document.write("<form id='voteForm' method='POST' action='https://docs.google.com/forms/d/e/1FAIpQLSf6g7OSR0P0sQ89bHKDY2zxRjLCVcmf2eahnQXQms62vN58SQ/formResponse'>");
  newWindow.document.write("<input type='hidden' name='entry.1534549768' value='" + answer + "'>");
  newWindow.document.write("</form>");
  newWindow.document.write("<script>document.getElementById('voteForm').submit();<\/script>");
  newWindow.document.write("</body></html>");
  newWindow.document.close();
}

// --- Initialisation lorsque le DOM est chargé ---
document.addEventListener("DOMContentLoaded", function() {
  // Ajoute un listener sur le bouton "Ça m’intéresse"
  document.getElementById("interestButton").addEventListener("click", function(e) {
    e.preventDefault();
    
    if (hasVotedAlready()) {
      alert("Vous avez déjà voté, merci !");
      return;
    }
    
    // Envoi d'un événement à Google Analytics via Google Tag Manager
    dataLayer.push({
      'event': 'vote_interested',
      'eventCategory': 'survey',
      'eventAction': 'click',
      'eventLabel': 'Ça m’intéresse'
    });
    
    // Définit le cookie pour éviter les votes multiples
    setCookie("hasVoted", "true", 365);
    
    // Redirige vers le formulaire Google pour envoyer le vote
    sendVote("Ça m’intéresse");
  });
});
