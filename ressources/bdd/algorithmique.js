document.addEventListener("DOMContentLoaded", init);

function init(event) {
    let boutons = document.querySelectorAll(".correction");
    boutons.forEach(b => b.addEventListener("click", afficherCorrection));
    // Insertion du copyright
    let copyright = document.createElement("div");
    copyright.id="copyright";
    copyright.innerText = "©(Bruno Mermet, Gaële Simon) \u2014 Université Le Havre - Normandie, Licence Creative Commons BY-NC-SA, 2020-2026\u00A0";
    let body = document.getElementById("main");
    body.appendChild(copyright);
    // Insertion du retour vers le menu
    let back = document.createElement("span");
    back.innerText = "\u00A0"
    let lienBack = document.createElement("a");
    lienBack.href="index.html"
    lienBack.innerText = "↑";
    lienBack.className="menu";
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
    // ajout de numéros de ligne
    let blocsHaskell = document.querySelectorAll("pre.haskell");
    for (blocHaskell of blocsHaskell) {
	spans = blocHaskell.querySelectorAll("span");
	numLigne = 1
	for (span of spans) {
	    spanEtiquette = document.createElement("span")
	    spanEtiquette.classList.add("num")
	    etiquette = document.createTextNode((numLigne < 10?' ':'')+numLigne+": ")
	    spanEtiquette.appendChild(etiquette)
	    span.parentNode.insertBefore(spanEtiquette, span)
	    numLigne = numLigne + 1
	}
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
