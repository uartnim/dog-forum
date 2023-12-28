let userNameMain = document.querySelector(".transfer_username");
userNameMain.innerText =localStorage.getItem("username_login");
console.log(localStorage.getItem("username_login"));


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


let postTitle = document.getElementById("posttiltle");
let userName = document.getElementById("username");
let postCont = document.getElementById("posttext");
let postBtn = document.querySelector(".postupbtn");
postBtn.addEventListener('click', (e) => {
    console.log(localStorage.getItem("currentUser"));
    if (localStorage.getItem("currentUser") !== "") {
        if (userName.value == "" || postCont.value == "" || postTitle.value == "") {
            if (userName.value == "") {
                alert("User...")
            }

            if (postCont.value == "") {
                alert("Missing content, fill out")
            }

            if (postTitle.value == "") {
                alert("your title is missing")
            }
        }
        else if (userName.value !== "" || postCont.value !== "" || postTitle.value !== "") {
            
            localStorage.setItem("new_post", JSON.stringify({
                newPostUser: userName.value,
                newPostExcert: postCont.value,
                newPostTitle: postTitle.value
            }));
        }

    }

      window.location.href="./blog.html";
}
)
