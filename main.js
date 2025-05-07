// Contenu dynamique pour chaque "page"
const content = {
  home: `
    <section class="regle" aria-labelledby="titre-regles">
        <p>Bienvenue sur le site du <strong>Memory de l'ENI</strong> !</p>
        <p>Venez jouer avec nous et tentez de réaliser le meilleur score possible.</p>

        <h2 id="titre-regles">Règles du jeu</h2>
        <ul>
            <li>Retournez deux cartes. Si les images sont identiques, elles restent visibles.</li>
            <li>Si les images sont différentes, elles se retournent faces cachées à leur emplacement initial.</li>
            <li>La partie se termine lorsque toutes les cartes ont été assemblées par paires.</li>
        </ul>

        <div class="image-container">
            <img src="/medias/memory_detail.png" alt="Exemple de carte du jeu Memory" />
        </div>

        <p>Si vous souhaitez conserver votre score, inscrivez-vous via le formulaire.</p>
        <p>Le jeu garde les 5 meilleurs scores.</p>
        <p>Pour relancer une partie, cliquez sur la barre d'espace.</p>
    </section>
  `,

  inscription: `
    <div id="container">
        <h1>Inscrivez-vous</h1>
        <form id="userForm" name="form1">
            <label for="fname">Nom d'utilisateur:</label><br><br>
            <input type="text" id="fname" name="fname" placeholder="3 caractères minimum" value=""><br><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" placeholder="Votre email" value=""><br><br>
            <div id="errorEmail" class="errorEmail"></div>
            <label for="password">Password:</label><br>
            <div class="input-group">
            <input type="password" id="userPassword" name="userPassword" placeholder="Votre mot de passe">
            <span class="input-hint">Au moins un symbole, un chiffre, ainsi que 6 caractères minimum</span>
            </div>
            <label for="password">Confirmer le mot de passe</label><br>
            <input type="password" id="userPassword2" name="userPassword2" placeholder="Confirmer le mot de passe" value=""><br><br>
            <button type="submit" class="btn">Création du compte</button>
            <button type="submit" id ="exit" class="btn">Annuler</button>
              
        </form>
    </div>
  `,

  jouer: `
<main id="cards">
  <header>
    <h1>MEMORY Game</h1>
  </header>
   <select id="themeSelector">
                    <option value="extraterrestre">Extraterrestre</option>
                    <option value="animaux">Animaux</option>
                    <option value="animauxAnimes">Animaux animés</option>
                    <option value="animauxDomestiques">Domestiques</option>
                  </select>  

  <div id="gameBoard"></div>
  <div id="messageWin"></div>
</main>
  `,

  connexion: ` <div id="container-Connexion">
        <!-- zone de connexion -->
        <form action="" method="" id ="connexion">
            <h1>Connexion</h1>
            <label><b>Nom d'utilisateur</b></label>
            <input type="text" id="userConnexion" placeholder="Entrer le nom d'utilisateur" name="username" required>
            <div id="errorUser" class="error2"></div>

            <label><b>Mot de passe</b></label>
            <input type="password" id="passwordConnexion" placeholder="Entrer le mot de passe" name="password" required>
            <div id="errorPassword" class="error1"></div>
            <button type="submit" class="btn">Se connecter</button>
            
            
        </form>
        <div id="messageConnexion"></div>
    </div>`,

  profil: `
      <div id="container-profil">
            <h1>Profil</h1>
            <form id="profilForm" >
                    <label for="username">Nom d'utilisateur:</label>
                    <input type="text" id="username" name="username" placeholder="Nom d'utilisateur" required />
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Votre email" required />
                    <label for="level">Choix du Memory:</label>
                  <select id="themeSelector2">
                    <option value="choix">Choix</option>
                    <option value="extraterrestre">Extraterrestre</option>
                    <option value="animaux">Animaux</option>
                    <option value="animauxAnimés">Animaux animés</option>
                    <option value="animauxDomestiques">Domestiques</option>
                  </select>  

                  <div id="imageContainer2">
                    <img id="imageTheme" src="" alt="Thème sélectionné" style="display:none; max-width: 600px;">
                  </div>
                    <label for="memorySize">Taille du Memory:</label>
                    <select id="memorySize" name="memorySize">
                        <option value="choix">Choix</option>
                        <option value="3">4*3cartes</option>
                        <option value="4">7*4cartes</option>
                        <option value="2">5*2 cartes</option>
                        <option value="3">4*2 cartes</option>
                    </select>
                    <button type="button" id = "sumbitProfil" class="btn">Enregistrer Option </button>
                    <button type="button" id ="exit" class="btn">Se decconecter </button>
            </form>
        
        </div>`,

  // Ajouter d'autres pages ici, par exemple, pour "Profil" et "Jouer"
};

// ------- je cree une fonction pour inserer les contenus html dynamiquement
function loadPage(page) {
  const contentElement = document.getElementById("content");
  contentElement.innerHTML = content[page] || "<p>Page introuvable.</p>";

  //--------------- Page jouer -----------------
  // Si la page est "jouer", on lance le jeu automatiquement
  if (page === "jouer") {
    const gameBoard = document.getElementById("gameBoard");
    const themeSelector = document.getElementById("themeSelector");
    fetch('library.json')
    .then(response => response.json())
    .then(library => {
      // Créer une instance du jeu et lancer automatiquement
      // Crée et démarre le jeu avec les données JSON + theme

      const savedTheme = localStorage.getItem("theme") || "legumes"; // fallback valeur par defaut legume
      themeSelector.value = savedTheme;

      let memoryGame = new MemoryGame(gameBoard, library);
      memoryGame.selectedTheme = savedTheme; // Appliquer le thème choisi
      //memoryGame.startGame();

      themeSelector.addEventListener("change", (event) => {
        const newTheme = event.target.value; // Obtenir le thème sélectionné
        localStorage.setItem("theme", newTheme); // Sauvegarder le thème choisi dans localStorage
        memoryGame.selectedTheme = newTheme; // Appliquer le nouveau thème
        memoryGame.startGame(); // Redémarrer le jeu avec le nouveau thème
        gameBoard.style.visibility = "visible";
        gameBoard.style.opacity = 1; // Rendre le tableau visibl
      });

      // Afficher le tableau de jeu lors de la première exécution
      gameBoard.style.visibility = "visible";
      gameBoard.style.opacity = 1; // Appliquer l'animation de visibilité

      // Redémarrer le jeu lorsqu'on appuie sur "Espace"
      document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
          console.log("Espace pressée : redémarrage du jeu");
          const newGame = new MemoryGame(gameBoard, library);
          newGame.startGame();
        }
      });
    })
    .catch(error => {
      console.error("Erreur lors du chargement de library.json :", error);
    });
}
 
  if (page === "inscription") initInscriptionPage();
  if (page === "profil") initProfilPage();
  if (page === "connexion") initConnexionPage();
}

//--------------------------------------------- Gestion DOM--------
//Navigation dynamique : écouter les clics sur les liens
// je vais selectionner tous les <a> à l'interieur de la balise nav (ici je vais chopper les liens cliqués )
document.querySelectorAll("nav a").forEach((link) => {
  // quand je clique sur le lien je veux charger la contenu demandé
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le comportement par défaut de recharger la page
    // afin de passer la variable page à ma fonction loadpage je vais chercher la data-page de mes liens
    const page = e.target.dataset.page || e.target.getAttribute("href").substring(1);
    loadPage(page); // Charger le contenu de la page demandée
  });
});

// Charger la page d'accueil par défaut  quand je lance la page pas good car je perds ma page quand je navigue
//document.addEventListener("DOMContentLoaded", () => loadPage("home"));
// Charger la page d'accueil par défaut ou la dernière page visitée
document.addEventListener("DOMContentLoaded", () => {
  const lastVisitedPage = localStorage.getItem("lastVisitedPage");
  // Si une page a été visitée précédemment, on la charge
  if (lastVisitedPage) {
    loadPage(lastVisitedPage); 
  } else {
    // Si aucune page n'est enregistrée, on charge la page d'accueil
    loadPage("home");
  }
});

