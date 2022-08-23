//CALCULATOR
//top progress bar
const caclculatorTopBarCurrent = document.querySelector(".popup__dish-kcal-current");
const caclculatorTopBarMax = document.querySelector(".popup__dish-kcal-max");
const caclculatorTopBarProgress = document.querySelector(".popup__dish-progress-span");
//inputs
const calculatorRangeValue = document.querySelector(".popup__dish-range");
const calculatorInputKcal = document.querySelector(".popup__dish-input--kcal");
const calculatorInputWeight = document.querySelector(".popup__dish-input--weight");
const calculatorInputXe = document.querySelector(".popup__dish-input--xe");
//submit button
const calculatorFinalKcalSpan = document.querySelector(".popup__dish-finish-kcal");
const calculatorFinalWeightSpan = document.querySelector(".popup__dish-finish-weight");
//custom input range
const customRangeBar = document.querySelector(".custom-range__progress-bar");
const customRangeThumb = document.querySelector(".custom-range__thumb");
// reset button
const calculatorResetButton = document.querySelector(".popup__dish-reset-button");
// show protein lipid and carb
const calculatorProteinNumber = document.querySelector(".popup__dish-protein-number");
const calculatorLipidNumber = document.querySelector(".popup__dish-lipid-number");
const calculatorCarbNumber = document.querySelector(".popup__dish-carb-number");
const calculatorBreadNumber = document.querySelector(".popup__dish-bread-number");
// hidden inputs
const calculatorProteinHidden = document.querySelector(".popup__protein-hidden");
const calculatorLipidHidden = document.querySelector(".popup__lipid-hidden");
const calculatorCarbHidden = document.querySelector(".popup__carb-hidden");

let calculatorData = {
    "date": "2022-08-15 18:55:54.008929",
    "Protein": 6,
    "Lipid": "10",
    "Carb": "4",
    "Kcal": "130",
    "MaxKcal": "450",
    "MealType": "Завтрак",
    "MealTitle": "Овощная запеканка",
    "Gram": "",
    "MealID": "Le6eBZACS9enfXN2KFQqCg"
};

let calculatorProtein, calculatorLipid, calculatorCarb;

caclculatorTopBarMax.innerHTML = calculatorData.MaxKcal;
calculatorRangeValue.setAttribute("max",calculatorData.MaxKcal);
calculatorResetButton.addEventListener("click", function(){
    resetInputs();
})

function updateTextInput() {
    let kcal = calculatorRangeValue.value;

    customRangeThumb.style.left = ((kcal/calculatorData.MaxKcal)*100)+"%";
    customRangeBar.style.width = ((kcal/calculatorData.MaxKcal)*100)+"%";

    calculatorInputKcal.value = kcal;
    calculatorFinalKcalSpan.innerHTML = calculatorInputKcal.value;

    let weight = calculateWeight(calculatorRangeValue.value);
    calculatorFinalWeightSpan.innerHTML = weight;    
    calculatorInputWeight.value = weight;

    calculatorProtein = ((weight/100)*calculatorData.Protein).toFixed(1);
    calculatorLipid = ((weight/100)*calculatorData.Lipid).toFixed(1);
    calculatorCarb = ((weight/100)*calculatorData.Carb).toFixed(1);

    //fill protein carb and lipid
    calculatorProteinNumber.innerHTML = calculatorProtein;
    calculatorProteinHidden.value = calculatorProtein;

    calculatorLipidNumber.innerHTML = calculatorLipid;
    calculatorLipidHidden.value = calculatorLipid;

    calculatorCarbNumber.innerHTML = calculatorCarb;
    calculatorCarbHidden.value = calculatorCarb;

    //fill top bar
    caclculatorTopBarCurrent.innerHTML = kcal;
    caclculatorTopBarProgress.style.width = ((kcal/calculatorData.MaxKcal)*100)+"%";

    let xeNumber = calculateXe(weight);
    calculatorInputXe.value = xeNumber;
    calculatorBreadNumber.innerHTML = xeNumber;
}

function changeTextInput(element) {
    let elementClassArray = element.className.split(" ");
    let elementValue = element.value;
    switch (elementClassArray[1]) {
        case "popup__dish-input--weight":
            elementValue = calculateKcalByWeight(elementValue);
            break;
        case "popup__dish-input--xe":
            elementValue = calculateKcalByXe(elementValue);
            break;
    }
    calculatorRangeValue.value = elementValue;
    updateTextInput();
}

function calculateWeight(weight){
    return ((weight/calculatorData.Kcal)*100).toFixed(1);
}

function calculateXe(weight){
    return (((calculatorData.Carb/100)*weight)/15).toFixed(1);
}

function calculateKcalByWeight(weight){
    return ((weight*calculatorData.Kcal)/100).toFixed(1);
}

function calculateKcalByXe(xe){
    let weight = ((1500*xe)/calculatorData.Carb).toFixed(1);
    return calculateKcalByWeight(weight);
}

function resetInputs(){
    calculatorRangeValue.value = 0;
    calculatorInputKcal.value = 0;
    calculatorInputWeight.value = 0;
    calculatorInputXe.value = 0;
    updateTextInput();
}

updateTextInput();