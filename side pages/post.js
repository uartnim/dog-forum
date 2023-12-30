
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

    


 let post = document.querySelector(".postcmt");
let post_container = document.querySelector(".post_container");
let name = document.getElementById("name");
let cmt_text = document.getElementById("cmt_text");

let getListCommentFromLocalStorage = JSON.parse(
    localStorage.getItem("List comment")
    );
    
    if (getListCommentFromLocalStorage == null) {
        localStorage.setItem("List comment", JSON.stringify([]));
        location.reload();
    } else {
        post.addEventListener("click", () => {
            if (name.value == "" || cmt_text.value == "") {
                alert("Write more...");
            } else {
                getListCommentFromLocalStorage.push({
                    name: name.value,
                    my_comment: cmt_text.value,
                    currentDate: "7/2/2024",
                    
                });
                
                console.log(getListCommentFromLocalStorage);
                
                localStorage.setItem(
                    "List comment",
                JSON.stringify(getListCommentFromLocalStorage)
                );

                location.reload();
                let CurrentDate = "7/2/2024";
                

                
                
                let newDiv = document.createElement("div");
                newDiv.className = "post";
                newDiv.innerHTML = `
                < <div class="logo_holder">
            <img class="img" src="./images/dingo-x-gray-moon-blue.jpg" alt="" />
            </div>
            
            <div class="content">
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                repellat eveniet atque minus itaque. Ipsam voluptatem ipsum mollitia
                adipisci quibusdam tempore cupiditate maxime aliquid facilis quasi
                magni autem, eos aperiam?
            </p>

            </div>
            
    <div class="infor_cmt">
    <div class="infor">
            <b><span class="person_name">Huong </span></b>
            <span> Dec 22, 2023</span>
            </div>

            <div class="rep_cmt">
            <span>Reply</span>
            </div>
            </div>
            `;
            name.value = "";
            cmt_text.value = "";
            post_container.appendChild(newDiv);
            
        }
    });
    
    renderComment(getListCommentFromLocalStorage);
    
    function renderComment(array_list_comment) {
        for (let i = 0; i < array_list_comment.length; i++) {
            let newDiv = document.createElement("div");
            newDiv.className = "post";
            newDiv.innerHTML = `
            <div style="display: flex; align-items: flex-start;">
            <div class="logo_holder">
            <img class="img" src="./images/dingo-x-gray-moon-blue.jpg" alt="" />
            </div>
            
            <div class="content">
            <p> ${array_list_comment[i].my_comment}
            </p>
            </div>
            </div>
            <div class="infor_cmt">
            <div class="infor">
            <b><span class="person_name">${array_list_comment[i].name}</span></b>
            <span> February 7, 2024</span>
            </div>
            
            <div class="rep_cmt">
            <span>Reply</span>
            </div>
            </div>
            `;
            name.value = "";
            cmt_text.value = "";
            post_container.appendChild(newDiv);
        }
    }
};

let post_cont = document.querySelectorAll(".excert");
let post_name = document.querySelectorAll(".posts-title");
let post_image = document.querySelectorAll(".feature-img");
let post_view = document.querySelectorAll(".view");
let post_date = document.querySelectorAll(".date");
let post_cmt = document.querySelectorAll(".comments");
let post_user = document.querySelectorAll(".user-name");
post_name.innerText = JSON.parse(localStorage.getItem("current_page")).currentPostName;
post_image.src = JSON.parse(localStorage.getItem("current_page")).currentPostImg;
post_view.innerText = JSON.parse(localStorage.getItem("current_page")).currentPostViews;
post_date.innerText = JSON.parse(localStorage.getItem("current_page")).currentPostDate;
post_cmt.innerText = JSON.parse(localStorage.getItem("current_page")).currentPostCOmments;
post_user.innerText = JSON.parse(localStorage.getItem("current_page")).currentPostUser;
post_user.innerText = JSON.parse(localStorage.getItem("current_page")).currentPostUser;
post_cont.innerText =  JSON.parse(localStorage.getItem("current_page")).currentPostExcert; 


console.log(JSON.parse(localStorage.getItem("current_page")).currentPostName
)



let userNameMain = document.querySelector(".transfer_btn");
userNameMain.innerText =localStorage.getItem("username_login");
console.log(localStorage.getItem("username_login"));

let logoutBtn = document.querySelector(".logout");
// logout button click event listener
logoutBtn.addEventListener("click", function (){
    userNameMain.innerText = "Login/Signup";
    localStorage.removeItem("username_login");
    window.location.reload;
})
