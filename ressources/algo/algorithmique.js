document.addEventListener("DOMContentLoaded", init);

function init(event) {
    let boutons = document.querySelectorAll(".correction");
    boutons.forEach(b => b.addEventListener("click", afficherCorrection));
    // Insertion du copyright
    let copyright = document.createElement("div");
    copyright.id="copyright";
    copyright.innerText = "©Bruno Mermet \u2014 Université Le Havre - Normandie, Licence Creative Commons BY-NC-SA, 2019\u00A0";
    let body = document.getElementById("main");
    body.appendChild(copyright);
    // Insertion du retour vers le menu
    let back = document.createElement("span");
    back.innerText = "\u00A0"
    let lienBack = document.createElement("a");
    lienBack.href="index.html"
    lienBack.innerText = "↑";
    back.appendChild(lienBack);
    let titre = document.getElementsByTagName("h1")[0];
    console.log(titre);
    if (titre.className != "racine") {
      titre.appendChild(back);
    }
    // ajout d'un lien suivant
    let suivant = titre.getAttribute("suivant");
    if (suivant != undefined) {
      console.log(suivant);
      let spanSuivant = document.createElement("span");
      spanSuivant.innerText = "\u00A0";
      let lienSuivant = document.createElement("a");
      lienSuivant.href=suivant;
      lienSuivant.className="suivant";
      lienSuivant.innerText = "\u2192";
      spanSuivant.appendChild(lienSuivant);
      titre.appendChild(spanSuivant);
    }
}

function afficherCorrection(event) {
  let idCorrection = this.getAttribute("idCorrection");
  let correction = document.getElementById(idCorrection);
  if (correction.style.display=="block") {
    correction.style.display = "none";
  }
  else {
    correction.style.display = "block";
  }
}
