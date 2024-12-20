import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAIzRbsbRnEIBv3tY8tauSnS6cBvGsRy7w",
    authDomain: "exc-project-1f22d.firebaseapp.com",
    projectId: "exc-project-1f22d",
    storageBucket: "exc-project-1f22d.firebasestorage.app",
    messagingSenderId: "348413599942",
    appId: "1:348413599942:web:0b5c6a8bea53404a8877c7",
    measurementId: "G-R8FM1XT7VS"
};

console.log("hmmmm");

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

document.getElementById('signInWithGoogle').addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
});

onAuthStateChanged(auth, (user) => {
    const statusElement = document.getElementById('status');
    if (user) {
        statusElement.textContent = `Status: Logged in as ${user.email}`;
        window.location.href = "/chatterBot.html";
    } else {
        statusElement.textContent = 'Status: Not logged in';
    }
});



document.getElementById('sign-up').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('User signed up successfully!');
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});

document.getElementById('login').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('User logged in successfully!');
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});


