function initInscriptionPage() {
  function isValideEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (pattern.test(email)) {
      alert("Valid email!");
      return true;
    } else {
      alert("You have entered an invalid email!");
      return false;
    }
  }

  function isValidePassword(password) {
    const errors = [];

    if (password.length < 6) {
      errors.push("Le mot de passe doit contenir au moins 6 caractères.");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Il doit contenir au moins une lettre minuscule.");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Il doit contenir au moins une lettre majuscule.");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("Il doit contenir au moins un chiffre.");
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push(
        "Il doit contenir au moins un caractère spécial (@, $, !, %, *, ?, &)."
      );
    }

    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!pattern.test(password)) {
      errors.push("Le mot de passe ne respecte pas toutes les règles.");
    }

    if (errors.length === 0) {
      alert("Mot de passe valide !");
      return true;
    } else {
      alert("Mot de passe invalide :\n" + errors.join("\n"));
      return false;
    }
  }

  function isValidUser(userName) {
    if (userName.length < 3) {
      alert("Le nom d'utilisateur doit contenir au moins 3 caractères.");
      return false;
    }
    return true;
  }

  function isValidPasswordConfirm(password, passwordConfirm) {
    if (password === passwordConfirm) {
      return true;
    } else {
      alert("Les mots de passe ne sont pas identiques");
      return false;
    }
  }

  function isFormValid(email, password, userName, passwordConfirm) {
    const validEmail = isValideEmail(email);
    const validUser = isValidUser(userName);
    const validPassword = isValidePassword(password);
    const validPasswordConfirm = isValidPasswordConfirm(password,passwordConfirm);

    if (validEmail && validUser && validPassword && validPasswordConfirm) {
      return true;
    } else {
      return false;
    }
  }

  const form = document.getElementById("userForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
  
    const userName = document.getElementById("fname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("userPassword").value;
    const passwordConfirm = document.getElementById("userPassword2").value;
    console.log(password + passwordConfirm + userName);
    

    const formIsValid = isFormValid(email, password, userName, passwordConfirm);

    if (formIsValid) {
      
      const cleanedEmail = email.trim();
      // Vérifier si un utilisateur avec le même email existe déjà
      const existingUserData = localStorage.getItem("userData");
      if (existingUserData) {
        const existingUser = JSON.parse(existingUserData);
        if (existingUser.email === cleanedEmail) {
          alert(" Un utilisateur avec cet email existe déjà.");
          return;
        }
      }

      const user = {
        username: userName,
        email: email,
        password: password,
      };

      localStorage.setItem("userData", JSON.stringify(user));
      alert(" Données enregistrées dans le localStorage !");
      loadPage("connexion");
    } else {
      alert("Veuillez vérifier que tous les champs sont valides.");
    }
  });


const exit = document.getElementById("exit");
exit.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("user");
    window.location.href = "index.html";

})

  // A voir le script en cas de fermeture de la page
 
}
