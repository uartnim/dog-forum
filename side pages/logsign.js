
let temperature = document.getElementById("temperature");
let imgTemp = document.getElementById("show_temp");
let img = document.createElement("img");
img.src = "";



fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=hanoi`
)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.results[0].latitude);
        console.log(data.results[0].longitude);

        let latitude = data.results[0].latitude;
        let longitude = data.results[0].longitude;

        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (data_weather) {
                // console.log(data_weather)
                console.log(data_weather.current_weather.weathercode);
                let weather_code = data_weather.current_weather.weathercode;
                console.log(weather_code);


                if (weather_code >= 0 && weather_code <= 3) {
                    imgTemp.style.backgroundImage = "url('./images/sunny.gif')";
                    imgTemp.style.backgroundRepeat = "no-repeat";
                    imgTemp.style.zIndex = "1";


                } else if (weather_code >= 45 && weather_code <= 77) {
                    imgTemp.style.backgroundImage = "url('./images/cloudy.gif')";
                    imgTemp.style.backgroundRepeat = "no-repeat";
                    imgTemp.style.zIndex = "1";
                    
                    
                    

                } else if (weather_code >= 77 && weather_code <= 99) {
                    imgTemp.style.backgroundImage = "url('./images/rainy.gif')";
                    imgTemp.style.backgroundRepeat = "no-repeat";
                    imgTemp.style.zIndex = "1";
                    
                }
                
                temperature.innerText = data_weather.current_weather.temperature;
                console.log(data_weather.current_weather.temperature);

            });
    });



    
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




let userNameMain = document.querySelector(".transfer_username");
userNameMain.innerText =localStorage.getItem("username_login");
console.log(localStorage.getItem("username_login"));