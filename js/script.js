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