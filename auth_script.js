// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0klvquNzRE4dAMmB53W3QIJnsBOkFVmg",
    authDomain: "ftv3-a8285.firebaseapp.com",
    projectId: "ftv3-a8285",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

const googleSignInBtn = document.getElementById('googleSignInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const authContainer = document.getElementById('auth-container');
const userInfo = document.getElementById('user-info');
const userDisplayName = document.getElementById('user-display-name');
const userUid = document.getElementById('user-uid');
const userEmail = document.getElementById('user-email');
const userProfilePic = document.getElementById('user-profile-pic');

// Check the authentication state when the page loads
auth.onAuthStateChanged((user) => {
    if (window.location.pathname.includes("modsquad.html")) { //Check if on modsquad page
        handleAuthStateChange(user);
    }
});

googleSignInBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      window.location.href = 'modsquad.html'; // Redirect after login
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
});



function handleAuthStateChange(user) {
  if (user) {
    userInfo.style.display = 'block';
    userDisplayName.textContent = user.displayName;
    userUid.textContent = user.uid;
    userEmail.textContent = user.email;
    if (user.photoURL) {
      userProfilePic.src = user.photoURL;
      userProfilePic.style.display = 'inline-block';
    } else {
      userProfilePic.style.display = 'none';
    }
  } else {
    window.location.href = 'login.html'; // Redirect to login page if no user
  }
}


function updateUI(user) {
  if (user) {
    authContainer.style.display = 'none';
    userInfo.style.display = 'block';
    signOutBtn.style.display = 'block';

    userDisplayName.textContent = user.displayName;
    userUid.textContent = user.uid;
    userEmail.textContent = user.email;

    if (user.photoURL) {
      userProfilePic.src = user.photoURL;
      userProfilePic.style.display = 'inline-block';
    } else {
      userProfilePic.style.display = 'none';
    }

  } else {
    authContainer.style.display = 'block';
    userInfo.style.display = 'none';
    signOutBtn.style.display = 'none';
    userProfilePic.style.display = 'none';
  }
}