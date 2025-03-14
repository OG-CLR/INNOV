// --- Gestion des cookies ---
// Permet de définir un cookie
function setCookie(name, value, days) {
  var date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  var expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Permet de récupérer la valeur d'un cookie
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
// Cette fonction ouvre une nouvelle fenêtre et soumet automatiquement un formulaire POST
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
  // Incrémente le compteur de visiteurs
  countapi.hit('sauvezlesmeubles', 'visitors')
    .then(result => {
      document.getElementById('visitorCount').innerText = result.value;
      console.log("Visitor count:", result.value);
    })
    .catch(error => console.error("Erreur visitor count:", error));
  
  // Ajoute le listener sur le bouton "Ça m’intéresse"
  document.getElementById('interestButton').addEventListener('click', function(e) {
    e.preventDefault();
    
    if (hasVotedAlready()) {
      alert("Vous avez déjà voté, merci !");
      return;
    }
    
    // Incrémente le compteur du vote "Ça m’intéresse"
    countapi.hit('sauvezlesmeubles', 'interest')
      .then(result => {
        document.getElementById('buttonCount').innerText = result.value;
        console.log("Interest count:", result.value);
        // Définit le cookie pour éviter un vote multiple
        setCookie("hasVoted", "true", 365);
        // Redirige vers le formulaire Google pour envoyer le vote
        sendVote("Ça m’intéresse");
      })
      .catch(error => console.error("Erreur interest count:", error));
  });
});
