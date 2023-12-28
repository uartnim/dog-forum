// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} 
from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJL_OsImY1WGEqmKZSqu94w2PhvWSO1aY",
  authDomain: "login-signup-94e56.firebaseapp.com",
  projectId: "login-signup-94e56",
  storageBucket: "login-signup-94e56.appspot.com",
  messagingSenderId: "1001471887642",
  appId: "1:1001471887642:web:e1547bbcfa4ec6a9d304a3",
  measurementId: "G-3L7XN6CPJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

let username_login = document.getElementById("username_input_login");
let password_login = document.getElementById("password_input_login");
let username_register = document.getElementById("username_input_register");
let password_register = document.getElementById("password_input_register");
let login_btn = document.getElementById("login_btn");
let register_btn = document.getElementById("register_btn");

//register an account

register_btn.addEventListener("click", function () {
    let username = username_register.value;
    let password = password_register.value;

    createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, "user/" + user.uid), {
                username: username,
                password: password,
            })

            localStorage.setItem("currentUser",username_register.value);
            window.location.href="./login.html";

            alert("Create an account successful");

        }).catch((err) => {
            const errorCode = err.code;
            const erroMess = err.message;

            alert(erroMess);
        })

});


//login an exist account
login_btn.addEventListener("click", function () {
    let username = username_login.value;
    let password = password_login.value;


    signInWithEmailAndPassword(auth, username, password)

        .then((userCredential) => {
            const user = userCredential.user;
            let date = new Date();
            update(ref(database, "user/" + user.uid), {
                lastLogin: date
            })

            localStorage.setItem("username_login", username);

            alert("Login successful");
            window.location.href="./index.html";


            })
        .catch((err) => {
            const errorCode = err.code;
            const erroMess = err.message;

            alert(erroMess);
        })

})
