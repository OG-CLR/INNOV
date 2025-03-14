document.addEventListener("DOMContentLoaded", function() {
  // Incrémente le compteur de visiteurs avec le namespace "sauvezlesmeubles" et la clé "visitors"
  countapi.hit('sauvezlesmeubles', 'visitors')
    .then(result => {
      console.log("Visitor count:", result.value);
      document.getElementById('visitorCount').innerText = result.value;
    })
    .catch(error => console.error("Erreur lors de l'incrémentation des visiteurs:", error));

  // Ajoute un listener sur le bouton "Ça m’intéresse"
  document.getElementById('interestButton').addEventListener('click', function(e) {
    e.preventDefault();
    countapi.hit('sauvezlesmeubles', 'interest')
      .then(result => {
        console.log("Interest count:", result.value);
        document.getElementById('buttonCount').innerText = result.value;
      })
      .catch(error => console.error("Erreur lors de l'incrémentation du vote:", error));
  });
});
