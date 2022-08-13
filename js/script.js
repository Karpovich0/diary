//change current section
const dataButtonArray = document.querySelectorAll(".data__button");
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
const popupRadioButtonClose = document.querySelector(".popup__radio-button");
const popupRadioLabelArray = document.querySelectorAll(".popup__radio-label");
//remove all curent section kickstart
removeCurrentSection();

//listen click on button to make section current
for(let i = 0; i < dataButtonArray.length; i++){
    dataButtonArray[i].addEventListener("click", function(ent){       
        removeCurrentSection();        
        dataButtonArray[i].classList.add("data__button--current");
        sectionArray[i].classList.add("content-section--current");
        console.log("add current");
    })
}

//listen click on content-section-button to open details
for(let i = 0; i < contentSectionButtonArray.length; i++){
    contentSectionButtonArray[i].addEventListener("click", function(ent){       
        detailsArray[i].classList.add("details--current");
        console.log("open details");
    })
}
for(let i = 0; i < detailsBackButtonArray.length; i++){
    detailsBackButtonArray[i].addEventListener("click", function(ent){       
        detailsArray[i].classList.remove("details--current");
        console.log("close details");
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
        console.log("Close");
    })
};
// works with radio
popupOpenRadioMesuare.addEventListener("click", function(evt){    
    document.querySelector(".popup__radio-input-wrapper--measure-type").classList.add("popup__radio-input-wrapper--current");   
});
//close radio when u press on cross button
popupRadioButtonClose.addEventListener("click", function(evt){
    closeRadio();
});
//close radio when u press on radio input
for(let i = 0; i < popupRadioLabelArray.length; i++){
    popupRadioLabelArray[i].addEventListener("click", function(ent){ 
       closeRadio();
    })
};

popupOpenRadioInsuline.addEventListener("click", function(evt){    
    document.querySelector(".popup__radio-input-wrapper--insuline-type").classList.add("popup__radio-input-wrapper--current");
    console.log("open radio");
});

function closeRadio(){
    document.querySelector(".popup__radio-input-wrapper--measure-type").classList.remove("popup__radio-input-wrapper--current");
}


//remove all curent section
function removeCurrentSection(){
    if(document.querySelector(".content-section--current")){       
        document.querySelector(".content-section--current").classList.remove("content-section--current");
    }
    if(document.querySelector(".data__button--current")){  
        document.querySelector(".data__button--current").classList.remove("data__button--current");
    }
    console.log("removed current");
}