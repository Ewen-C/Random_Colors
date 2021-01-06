// Se lance au chargement de la page et quand le lien est sélectionné
functionChangeColors();


// Changement des couleurs sans recharger la page
function functionChangeColors() {

  // Affichage des couleurs précédentes
  functionShowPreviousColors();

  // Couleur fond
  var rand1 = Math.floor(Math.random() * 255);
  var rand2 = Math.floor(Math.random() * 255);
  var rand3 = Math.floor(Math.random() * 255);

  // Couleur texte (couleur complémentaire du fond)
  var rand4 = 255 - rand1, rand5 = 255 - rand2, rand6 = 255 - rand3;

  // Assignation des couleurs (rgb)
  //var str = "background-color: rgb(" + rand1 + "," + rand2 + "," + rand3 + "); ";
  //str += "color : rgb(" + rand4 + "," + rand5 + "," + rand6 + "); ";
  //document.querySelector("body").style = str; 


  // Affichage du texte
  document.getElementById("RED1").innerHTML = rand1 + " (" + Math.floor(rand1 / 2.55) + "%)";
  document.getElementById("GREEN1").innerHTML = rand2 + " (" + Math.floor(rand2 / 2.55) + "%)";
  document.getElementById("BLUE1").innerHTML = rand3 + " (" + Math.floor(rand3 / 2.55) + "%)";

  document.getElementById("RED2").innerHTML = rand4 + " (" + Math.floor(rand4 / 2.55) + "%)";
  document.getElementById("GREEN2").innerHTML = rand5 + " (" + Math.floor(rand5 / 2.55) + "%)";
  document.getElementById("BLUE2").innerHTML = rand6 + " (" + Math.floor(rand6 / 2.55) + "%)";

  //Codes héxadécimaux (en deux chiffres par couleur, 0 rajouté si nécessaire)
  document.getElementById("HEXA1").innerHTML = "#" + (rand1.toString(16).padStart(2, '0') + rand2.toString(16).padStart(2, '0') + rand3.toString(16).padStart(2, '0')).toUpperCase();
  document.getElementById("HEXA2").innerHTML = "#" + (rand4.toString(16).padStart(2, '0') + rand5.toString(16).padStart(2, '0') + rand6.toString(16).padStart(2, '0')).toUpperCase();

  // Assignation des couleurs (hexa, après que le code héxa du texte soit généré :P)
  var str = "background-color: " + document.getElementById("HEXA1").innerHTML + "; ";
  str += "color: " + document.getElementById("HEXA2").innerHTML + "; ";
  document.querySelector("body").style = str; 


  // Cacher si les codes précédents avaient été copiés
  document.querySelector("#info_Copy1").style = "visibility: hidden;";
  document.querySelector("#info_Copy2").style = "visibility: hidden;";

  functionSetLinksColor();
}

/* Copier le code héxa lors du clic */
function functionCopy(dataTarget) {

  // Sélection du texte
  var dataText = document.getElementById(dataTarget);
  var dataSelection = window.getSelection();
  var dataRange = document.createRange();
  dataRange.selectNodeContents(dataText);
  dataSelection.removeAllRanges();
  dataSelection.addRange(dataRange);

  // Copiage du texte
  document.execCommand('copy');
  dataSelection.removeAllRanges(); // Désélectionne le texte après copie
  console.log("Texte copié  : ' " + document.getElementById(dataTarget).innerHTML + " ' ! (" + dataTarget + ")");
  /* dataTarget est une variable et ne doit pas être entre guillemets ! */

  // Affichage String
  console.log("Afficher code copié (" + dataTarget + ") !");

  if (dataTarget == "HEXA1") {
    document.querySelector("#info_Copy1").style = "visibility: visible;";
  } else if (dataTarget == "HEXA2") {
    document.querySelector("#info_Copy2").style = "visibility: visible;";
  }
}

function functionSetLinksColor() {

  // Liens en noir ou blanc en fonction du fond
  let links = document.querySelectorAll("a"), linkstyle = "";

  let red1 = document.getElementById("RED1").innerHTML;
  let green1 = document.getElementById("GREEN1").innerHTML;
  let blue1 = document.getElementById("BLUE1").innerHTML;

  red1 = red1.substr(0, red1.indexOf(' '));
  green1 = green1.substr(0, green1.indexOf(' '));
  blue1 = blue1.substr(0, blue1.indexOf(' '));
  console.log("red1 = " + red1 + "  green1 = " + green1 + "  blue1 = " + blue1);
  
  if (red1 > 180 || green1 > 180 || blue1 > 180) {
    linkstyle = "color: Black;";
  }
  else {
    linkstyle = "color: White;";
  }
  for (let i = 0; i < links.length; i++) {
    links[i].style = linkstyle;
  }
}


// Afficher les couleurs précedentes
function functionShowPreviousColors() {
  let previousBack = document.querySelector("#hexaPreviousBackground");
  let previousText = document.querySelector("#hexaPreviousText");
  let hexa1 = document.querySelector("#HEXA1").innerHTML;
  let hexa2 = document.querySelector("#HEXA2").innerHTML;
  
  if (hexa1 == "") {
    previousBack.innerHTML = "#------";
    previousText.innerHTML = "#------";
    console.log("1er chargement");
  } else {
    previousBack.innerHTML = hexa1;
    previousText.innerHTML = hexa2;
    console.log("2+ chargement");

    document.querySelector("#linkColorSwap").style = "visibility: visible;";
    console.log(document.querySelector("#linkColorSwap").style);
  }
}

// Revenir aux couleurs précédentes (redéfiniton de functionChangeColors() compliquée)
function functionSwapPreviousColors() {
  let tmp1 = document.querySelector("#hexaPreviousBackground").innerHTML;
  let tmp2 = document.querySelector("#hexaPreviousText").innerHTML;
  let tmp3 = document.querySelector("#HEXA1").innerHTML;
  let tmp4 = document.querySelector("#HEXA2").innerHTML;

  // Assignation des couleurs
  var str = "background-color: " + tmp1 + "; color: " + tmp2 + "; ";
  document.querySelector("body").style = str; 
  console.log('document.querySelector("body").style = ' + str);


  // Mise à jour du texte :
  // Valeurs héxa actives (facile :D)
  document.querySelector("#HEXA1").innerHTML = tmp1;
  document.querySelector("#HEXA2").innerHTML = tmp2;

  document.querySelector("#hexaPreviousBackground").innerHTML = tmp3;
  document.querySelector("#hexaPreviousText").innerHTML = tmp4;
  

  // Codes RVB (moins facile - calculées avec l'héxa)

  // Le NaN (Not a Number) se vérifie avec isNaN() et pas avec == NaN !
  if (isNaN(Number(tmp1[1])) || isNaN(Number(tmp1[2])) ) { // Number() renvoie NaN car il y a au moins une lettre mais parseInt() fonctionne
    str = parseInt(tmp1[1] + (tmp1[2]), 16);
  } 
  else { // Pas de lettre : Number() renvoie un nombre et doit être utilisée pour ne pas concaténer les string
    str = parseInt(Number(tmp1[1] + tmp1[2]), 16);
  }  
  // Cette vérification n'est pas utile car parseInt() fonctionne avec tous les string, pas besoin de le changer d'abord en nombre !

  document.querySelector("#RED1").innerHTML = str + " (" + Math.floor(str / 2.55) + "%)";


  str = parseInt(tmp1[3] + (tmp1[4]), 16);
  document.querySelector("#GREEN1").innerHTML = str + " (" + Math.floor(str / 2.55) + "%)";
  str = parseInt(tmp1[5] + tmp1[6], 16);
  document.querySelector("#BLUE1").innerHTML = str + " (" + Math.floor(str / 2.55) + "%)";

  str = parseInt(tmp2[1] + (tmp2[2]), 16);
  document.querySelector("#RED2").innerHTML = str + " (" + Math.floor(str / 2.55) + "%)";
  str = parseInt(tmp2[3] + tmp2[4], 16);
  document.querySelector("#BLUE2").innerHTML = str + " (" + Math.floor(str / 2.55) + "%)";
  str = parseInt(tmp2[5] + (tmp2[6]), 16);
  document.querySelector("#GREEN2").innerHTML = str + " (" + Math.floor(str / 2.55) + "%)";
}


// Inverser couleur de texte et couleur de fond
function functionSwapBackAndText() {

  let tmp1 = document.querySelector("#HEXA1").innerHTML;
  let tmp2 = document.querySelector("#HEXA2").innerHTML;
  let tmp3 = "";

  // Assignation des couleurs
  var str = "background-color: " + tmp2 + "; color: " + tmp1 + "; ";
  document.querySelector("body").style = str;
  console.log('document.querySelector("body").style = ' + str);


  // Mise à jour manuelle du texte (Simplement déplacer le texte ne fonctionne pas car les ID aussi seront déplacées !)
  document.querySelector("#HEXA1").innerHTML = tmp2;
  document.querySelector("#HEXA2").innerHTML = tmp1;

  tmp1 = document.querySelector("#RED1").innerHTML;
  tmp2 = document.querySelector("#GREEN1").innerHTML;
  tmp3 = document.querySelector("#BLUE1").innerHTML;

  document.querySelector("#RED1").innerHTML = document.querySelector("#RED2").innerHTML;
  document.querySelector("#GREEN1").innerHTML = document.querySelector("#GREEN2").innerHTML;
  document.querySelector("#BLUE1").innerHTML = document.querySelector("#BLUE2").innerHTML;

  document.querySelector("#RED2").innerHTML = tmp1;
  document.querySelector("#GREEN2").innerHTML = tmp2;
  document.querySelector("#BLUE2").innerHTML = tmp3;


  functionSetLinksColor();
}


// Animer (0.3s) les transitions entre les couleurs

// Garder une couleur du RVB et changer les autres

// Gestion Hsl ?

// Mélange de couleurs (moyenne RVB) ?

// Indiquer une couleur + Outil color du html