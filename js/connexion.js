function initConnexionPage () {
  const form = document.getElementById("connexion");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("userConnexion").value.trim();
    const password = document.getElementById("passwordConnexion").value;

    const existingUserData = localStorage.getItem("userData");

    if (existingUserData) {
      const existingUser = JSON.parse(existingUserData);
      // Vérification de l'email et du mot de passe
      if (existingUser.email === email && existingUser.password === password) {
        alert("Connexion réussie !");

        const userConnexion = {
          emailConnexion: email,
          passwordConnexion: password,
        };

        localStorage.setItem("userConnexion", JSON.stringify(userConnexion));
        loadPage("profil");
      } else {
        alert("Email ou mot de passe incorrect.");
      }
    } else {
      alert("Utilisateur non connu");
    }



  });

const userConnexion = JSON.parse(localStorage.getItem("profil"));
const messageContainer = document.getElementById("messageConnexion");

if (userConnexion) {
  messageContainer.innerHTML = `
    <p style="color: green; font-weight: bold;">
      ✅ Vous êtes déjà connecté en tant que <em>${userConnexion.theme}</em>.
    </p>
  `;
  document.getElementById("connexion").style.display = "none";
}


}
