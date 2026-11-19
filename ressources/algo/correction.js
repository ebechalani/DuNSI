document.addEventListener("DOMContentLoaded", init);

var nbClics = 0;

function init(event) {
  paragraphe = document.createElement("p");
  paragraphe.innerText="À vous de travailler";
  paragraphe.setAttribute("id", "para");
  body = document.getElementsByTagName("body")[0];
  body.appendChild(paragraphe);
  paragraphe.addEventListener("click", traitement);
}

function traitement(event) {
  nbClics++;
  if (nbClics >= 5) {
    solution = document.getElementById("vimCodeElement");
    paragraphe = document.getElementById("para");
    paragraphe.style.display="None";
    solution.style.display="block";
  }
}
