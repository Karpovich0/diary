//change current section
const dataButtonArray = document.querySelectorAll(".data__button");
const dataButtonArrayItem = document.querySelectorAll(".data__button-item");
const sectionArray = document.querySelectorAll(".content-section");
//open details about data
const contentSectionButtonArray = document.querySelectorAll(".content-section__button");
const detailsArray = document.querySelectorAll(".details");
const detailsBackButtonArray = document.querySelectorAll(".details__back-button");
//open form
const contentSectionButton = document.querySelectorAll(".content-section__input-data-button");
const popupWrapperArray = document.querySelectorAll(".popup-wrapper");
const popupButtonResetCloseArray = document.querySelectorAll(".popup__button-reset-close");
// open radio form
const popupOpenRadioMesuare = document.querySelector("#popup-glucose-measure-type");
const popupOpenRadioInsuline = document.querySelector("#popup-insuline-type-button");
const popupRadioButtonCloseMeasure = document.querySelector(".popup__radio-button--measure");
const popupRadioButtonCloseInsuline = document.querySelector(".popup__radio-button--insuline");
const popupRadioLabelArrayGlucose = document.querySelectorAll(".popup__radio-label--glucose");
const popupRadioLabelArrayWeight = document.querySelectorAll(".popup__radio-label--weight");
// open search input
const searchButtonOpen = document.querySelector(".header__search-btn--open");
const searchButtonClose = document.querySelector(".header__search-btn--close");
const headerSearchForm = document.querySelector(".header__search-form");
const headerSearchResults = document.querySelector(".header__search-results");
// datetime input
const popupDatetimeArray = document.querySelectorAll(".popup__input--datetime");
// stop reload after submit form
const popupFormArray = document.querySelectorAll(".popup__form");

//listen click on button to make section current
for(let i = 0; i < dataButtonArray.length; i++){
    dataButtonArray[i].addEventListener("click", function(ent){       
        removeCurrentSection();        
        dataButtonArrayItem[i].classList.add("data__button-item--current");
        sectionArray[i].classList.add("content-section--current");       
    })
}

//listen click on content-section-button to open details
for(let i = 0; i < contentSectionButtonArray.length; i++){
    contentSectionButtonArray[i].addEventListener("click", function(ent){   
        if(detailsArray[i]){    
            detailsArray[i].classList.add("details--current");
        }else{
            console.log("details not exist");
        }
    })
}
for(let i = 0; i < detailsBackButtonArray.length; i++){
    detailsBackButtonArray[i].addEventListener("click", function(ent){       
        detailsArray[i].classList.remove("details--current");        
    })
}

for(let i = 0; i < contentSectionButton.length; i++){
    contentSectionButton[i].addEventListener("click", function(ent){ 
        popupDatetimeArray[i].value = generateDate();
        popupWrapperArray[i].classList.add("popup-wrapper--current");        
    })
}

for(let i = 0; i < popupButtonResetCloseArray.length; i++){
    popupButtonResetCloseArray[i].addEventListener("click", function(ent){  
        popupWrapperArray[i].classList.remove("popup-wrapper--current");        
    })
};
// works with radio
popupOpenRadioMesuare.addEventListener("click", function(evt){    
    document.querySelector(".popup__radio-input-wrapper--measure-type").classList.add("popup__radio-input-wrapper--current");   
});
//close radio when u press on cross button
popupRadioButtonCloseMeasure.addEventListener("click", function(evt){    
    closeRadio();
});
//close radio when u press on radio input
for(let i = 0; i < popupRadioLabelArrayGlucose.length; i++){
    popupRadioLabelArrayGlucose[i].addEventListener("click", function(ent){
       popupOpenRadioMesuare.textContent = popupRadioLabelArrayGlucose[i].textContent;
       closeRadio();
    })
};

popupOpenRadioInsuline.addEventListener("click", function(evt){    
    document.querySelector(".popup__radio-input-wrapper--insuline-type").classList.add("popup__radio-input-wrapper--current");    
});

//close insuline radio when u press on cross button
popupRadioButtonCloseInsuline.addEventListener("click", function(evt){    
    closeRadioInsuline();
});
//close radio when u press on radio input
for(let i = 0; i < popupRadioLabelArrayWeight.length; i++){
    popupRadioLabelArrayWeight[i].addEventListener("click", function(ent){
        popupOpenRadioInsuline.textContent = popupRadioLabelArrayWeight[i].textContent;         
        closeRadioInsuline();
    })
};

searchButtonOpen.addEventListener("click", function(evt){
    headerSearchForm.classList.add("header__search-form--current");
    headerSearchResults.classList.add("header__search-results--current");
});
searchButtonClose.addEventListener("click", function(evt){
    headerSearchForm.classList.remove("header__search-form--current");
    headerSearchResults.classList.remove("header__search-results--current");
})

// 

//search

function search() {
 
    var name = document.getElementById("searchForm").elements["searchItem"].value;
    var pattern = name.toLowerCase();
    var targetId = "";
  
    var divs = document.getElementsByClassName("col-md-2");
    for (var i = 0; i < divs.length; i++) {
       var para = divs[i].getElementsByTagName("p");
       var index = para[0].innerText.toLowerCase().indexOf(pattern);
       
    }  
 }

// close radio fields
function closeRadio(){
    document.querySelector(".popup__radio-input-wrapper--measure-type").classList.remove("popup__radio-input-wrapper--current");
};

function closeRadioInsuline(){
    document.querySelector(".popup__radio-input-wrapper--insuline-type").classList.remove("popup__radio-input-wrapper--current");
}

//remove all curent section
function removeCurrentSection(){
    if(document.querySelector(".content-section--current")){       
        document.querySelector(".content-section--current").classList.remove("content-section--current");
    }
    if(document.querySelector(".data__button-item--current")){  
        document.querySelector(".data__button-item--current").classList.remove("data__button-item--current");
    }    
}

// Algorithm of generation id from JSON response

// let responseFromServer = {
//     "user": [
//         {
//             "id": 1,
        
//             "user_id": "test",
        
//             "date": "2022-08-15 18:58:10.656835",
        
//             "weight": 77,
        
//             "comment": "heh"
        
//           },
//          {
        
//             "id": 1,
        
//             "user_id": "test",
        
//             "date": "2022-08-15 18:55:54.008929",
        
//             "glucose_level": 1.2,
        
//             "insulin_injection": 2.2,
        
//             "measure_type": "test",
        
//             "insulin_type": "test",
        
//             "comment": "test"
        
//           },    
//          {
        
//             "id": 1,
        
//             "user_id": "test",
        
//             "date": "2022-08-15 18:57:51.709122",
        
//             "meal_type": "Eda",
        
//             "meal_title": "Arbuz",
        
//             "meal_id": "1",
        
//             "gram": 5000,
        
//             "meal_plan": 3000,
        
//             "meal_fact": 2000
        
//           }
//     ]
//   }

//example
//we are setting id for first button
// id creating by next logic = we take reponse.date and delete all spaces
// contentSectionButtonArray[0].setAttribute("id",responseFromServer.user[0].date.replace(/\s+/g, ''));
// //we are setting id for first details - its for example how its works
// detailsArray[0].setAttribute("id",responseFromServer.user[0].date.replace(/\s+/g, ''));

// //on click on button we are searching in response for the same value as id. When it was found - yep!

// contentSectionButtonArray[0].addEventListener("click",function(){
//     // we need here forEach because n our example we have the dates that places in three objects
//     responseFromServer.user.forEach(item=>{
//         if(item.date.replace(/\s+/g, '') === contentSectionButtonArray[0].id){
//         console.log("yep");
//         detailsArray[0].classList.add("details--current");
//     }
//     })
// })

// u need to delete old function on 36-45 lines that I commented


// UPDATE
function generateDate(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;

    let time = hour + ":" + minute;   

    return today+"T"+time;
    // yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS".
}

for(let i = 0; i < popupFormArray.length; i++){
    popupFormArray[i].addEventListener("submit", function(e){
        e.preventDefault();

        const formData = new FormData(this);
        const searchParam = new URLSearchParams(formData);  
        console.log(searchParam);
        // change link
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: searchParam,
        }).then(function(response){
            return response.text();
        }).then(function(text){
            console.log(text);
        });
        // .then - for demonstration and can be deleted. Link must be changed on you website's address
        popupButtonResetCloseArray[i].click();
    })
}