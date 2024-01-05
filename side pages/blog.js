


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


    
    let postImg = document.querySelectorAll(".feature-img");
    let btn = document.querySelectorAll(".more_btn");
    let postName = document.querySelectorAll(".posts-title");
    let post = document.querySelectorAll(".excert");
    let postView = document.querySelectorAll(".view");
    let postDate = document.querySelectorAll(".date");
    let postCmt = document.querySelectorAll(".comments");
    let postUser = document.querySelectorAll(".user-name");
    
    
   for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', (e) => {
            
            localStorage.setItem("current_page", JSON.stringify({
                currentPostName: postName[i].innerText,
                currentPostImg: postImg[i].src ,
                currentPostExcert: post[i].innerText,
                currentPostViews: postView[i].innerText,
                currentPostDate: postDate[i].innerText,
                currentPostComments: postCmt[i].innerText,
                currentPostUser: postUser[i].innerText
            }));
            window.location.href="./post.html";
        }
        )
        postUser.innerText = JSON.parse(localStorage.getItem("current_page")).currentPostUser;
        postName.innerText = JSON.parse(localStorage.getItem("current_page")).currentPostName;
        post.innerText = JSON.parse(localStorage.getItem("current_page")).currentPostExcert;
        
        // console.log(JSON.parse(localStorage.getItem("current_page")).currentPostName)
    }
     

    
    localStorage.getItem("new_post", JSON.stringify({
        newPostName: postName[i].innerText,
        newPostExcert: post[i].innerText,
        newPostUser: postUser[i].innerText
    }));
    postUser.innerText = JSON.parse(localStorage.getItem("new_post")).newPostUser;
    postName.innerText = JSON.parse(localStorage.getItem("new_post")).newPostName;
    post.innerText = JSON.parse(localStorage.getItem("new_post")).newPostExcert;

    
    let userNameMain = document.querySelector(".transfer_username");
    userNameMain.innerText =localStorage.getItem("username_login");
    console.log(localStorage.getItem("username_login"));
    
    let logoutBtn = document.querySelector(".logout");
    // logout button click event listener
    logoutBtn.addEventListener("click", function (){
        userNameMain.innerText = "Login/Signup";
        localStorage.removeItem("username_login");
        window.location.reload;
    })
