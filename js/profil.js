function initProfilPage() {

 
//------------- Recuperer la data Connexion-----------

  const existingUserData = localStorage.getItem("userData");
  const existingUserConnexion = localStorage.getItem("userConnexion");

  if (existingUserData && existingUserConnexion) {
    const existingUser = JSON.parse(existingUserData);
    const existingConnexion = JSON.parse(existingUserConnexion);
    const input = document.getElementById("username");
  if (input) {
    input.value = existingUser.username;
    document.getElementById("username").setAttribute("readonly", "true");
  }
  const email = document.getElementById("email");
  if (email) {
     email.value = existingConnexion.emailConnexion
     document.getElementById("email").setAttribute("readonly", "true");

  };

  }

// ----------------choix des images --------

const select = document.getElementById("themeSelector2");
  const images = {
    legumes: "/medias/memory_detail.png",
    animaux: "/medias/animaux.png",
    animauxAnimés: "/medias/animes.png",
    animauxDomestiques: "/medias/domestiques.png",
  };

select.addEventListener("click", function (event) {
  const image = document.getElementById("imageTheme");
  const value = select.value;

  if (images[value]) {
    image.src = images[value];
    image.style.display = "block";
  } else {
    image.style.display = "none";
  }
});


//-------- Save date in Localstorage------

const save = document.getElementById("sumbitProfil");

save.addEventListener("click", function (event) {
  event.preventDefault();
  const theme = document.getElementById("themeSelector2").value.trim();
  const choix = document.getElementById("memorySize").value;
  const image2 = images[theme];
 
  if (theme !="choix" && choix != "choix"){

  const profil = {
    theme: theme,
    choix: choix,
    image:image2
  };

  localStorage.setItem("profil", JSON.stringify(profil));
  alert("Votre choix est enregistré");

} else {

  alert("Veuillez faire votre choix")
}

});

//------------ Recuperer le profil en cas de chagement de la page 
 const savedProfil = localStorage.getItem("profil");
 if (savedProfil) {
   const profil = JSON.parse(savedProfil);
   document.getElementById("themeSelector2").value = profil.theme;
   document.getElementById("memorySize").value = profil.choix;
   document.getElementById("imageTheme").src = profil.image;
   document.getElementById("imageTheme").style.display = "block";
   console.log("Profil chargé : ", profil);
 }
//---------------------------------------------


const exit = document.getElementById("exit");
exit.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("userConnexion");
    localStorage.removeItem("profil");
     window.location.href = "index.html";

});







}