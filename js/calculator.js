//CALCULATOR
//top progress bar
const caclculatorTopBarCurrent = document.querySelector(".popup__dish-kcal-current");
const caclculatorTopBarMax = document.querySelector(".popup__dish-kcal-max");
const caclculatorTopBarProgress = document.querySelector(".popup__dish-progress-span");
//inputs
const calculatorRangeValueArray = document.querySelectorAll(".popup__dish-range");
const calculatorInputKcalArray = document.querySelectorAll(".popup__dish-input--kcal");
const calculatorInputWeightArray = document.querySelectorAll(".popup__dish-input--weight");
const calculatorInputXeArray = document.querySelectorAll(".popup__dish-input--xe");
//submit button
const calculatorFinalKcalSpan = document.querySelector(".popup__dish-finish-kcal");
const calculatorFinalWeightSpan = document.querySelector(".popup__dish-finish-weight");
//custom input range
const customRangeBarArray = document.querySelectorAll(".custom-range__progress-bar");
const customRangeThumbArray = document.querySelectorAll(".custom-range__thumb");
// reset button
const calculatorResetButtonArray = document.querySelectorAll(".popup__dish-reset-button");
// show protein lipid and carb
const calculatorProteinNumber = document.querySelector(".popup__dish-protein-number");
const calculatorLipidNumber = document.querySelector(".popup__dish-lipid-number");
const calculatorCarbNumber = document.querySelector(".popup__dish-carb-number");
const calculatorBreadNumber = document.querySelector(".popup__dish-bread-number");
// hidden inputs
const calculatorProteinHidden = document.querySelector(".popup__protein-hidden");
const calculatorLipidHidden = document.querySelector(".popup__lipid-hidden");
const calculatorCarbHidden = document.querySelector(".popup__carb-hidden");
// show max kcal
const calculatorMaxRangeValue = document.querySelectorAll(".custom-range__value--max");
// MULTY DISH
const calculatorFieldsetArray = document.querySelectorAll(".popup__dish-fieldset");


let calculatorData = [{
    "id": "1",
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
    },
    {
    "id": "2",
    "date": "2022-08-15 18:55:54.008929",
    "Protein": 16,
    "Lipid": "20",
    "Carb": "14",
    "Kcal": "180",
    "MaxKcal": "469",
    "MealType": "Завтрак",
    "MealTitle": "Овощная запеканка",
    "Gram": "",
    "MealID": "Le6eBZACS9enfXN2KFQqCg"
    }
]

generateId();
let calculatorAllDishMaxKcal = getMaxKcal();

let calculatorAllCurrentKcal = new Array(calculatorData.length);
let calculatorAllCurrentWeight = new Array(calculatorData.length);

let calculatorAllCurrentProtein = new Array(calculatorData.length);
let calculatorAllCurrentLipid = new Array(calculatorData.length);
let calculatorAllCurrentCarb = new Array(calculatorData.length);
let calculatorAllCurrentXe = new Array(calculatorData.length);

caclculatorTopBarMax.innerHTML = calculatorAllDishMaxKcal;
setAllKcal();
calculatorResetButtonArray.forEach((item, index)=>item.addEventListener("click", function(){
    resetInputs(index);
}))


function updateTextInput(input) {
    let inputId; 

    if(isNaN(input)){
        inputId = Number(input.id)-1;
    }else{
        inputId = input;
    };
    
    let kcal = calculatorRangeValueArray[inputId].value;    

    customRangeThumbArray[inputId].style.left = ((kcal/calculatorData[inputId].MaxKcal)*100)+"%";
    customRangeBarArray[inputId].style.width = ((kcal/calculatorData[inputId].MaxKcal)*100)+"%";

    calculatorInputKcalArray[inputId].value = kcal;
    // write kcal on submit button
    let currentAllKcal = calculateCurerntAll(calculatorAllCurrentKcal, kcal, inputId);
    calculatorFinalKcalSpan.innerHTML = currentAllKcal;
    let weight = calculateWeight(calculatorRangeValueArray[inputId].value, inputId);
    
     // write weight on submit button
    let currentAllWeight =  (calculateCurerntAll(calculatorAllCurrentWeight, weight, inputId)).toFixed(1);
    calculatorFinalWeightSpan.innerHTML = currentAllWeight;    
    calculatorInputWeightArray[inputId].value = weight;    

    let calculatorProtein = ((weight/100)*calculatorData[inputId].Protein).toFixed(1);
    let calculatorLipid = ((weight/100)*calculatorData[inputId].Lipid).toFixed(1);
    let calculatorCarb = ((weight/100)*calculatorData[inputId].Carb).toFixed(1);

    //fill protein carb and lipid
    calculatorProteinNumber.innerHTML = (calculateCurerntAll(calculatorAllCurrentProtein, calculatorProtein, inputId)).toFixed(1);
    calculatorProteinHidden.value = calculateCurerntAll(calculatorAllCurrentProtein, calculatorProtein, inputId);

    calculatorLipidNumber.innerHTML = (calculateCurerntAll(calculatorAllCurrentLipid, calculatorLipid, inputId)).toFixed(1);
    calculatorLipidHidden.value = (calculateCurerntAll(calculatorAllCurrentLipid, calculatorLipid, inputId)).toFixed(1);

    calculatorCarbNumber.innerHTML = (calculateCurerntAll(calculatorAllCurrentCarb, calculatorCarb, inputId)).toFixed(1);
    calculatorCarbHidden.value = (calculateCurerntAll(calculatorAllCurrentCarb, calculatorCarb, inputId)).toFixed(1);

    //fill top bar
    caclculatorTopBarCurrent.innerHTML = currentAllKcal;
    caclculatorTopBarProgress.style.width = ((currentAllKcal/calculatorAllDishMaxKcal)*100)+"%";

    let xeNumber = calculateXe(weight, inputId);
    calculatorInputXeArray[inputId].value = xeNumber;    
    calculatorBreadNumber.innerHTML = (calculateCurerntAll(calculatorAllCurrentXe, xeNumber, inputId)).toFixed(1);
}

function changeTextInput(element) {
    let elementId = Number(element.id)-1;
    let elementClassArray = element.className.split(" ");
    let elementValue = element.value;
    switch (elementClassArray[1]) {
        case "popup__dish-input--weight":
            elementValue = calculateKcalByWeight(elementValue, elementId);
            break;
        case "popup__dish-input--xe":
            elementValue = calculateKcalByXe(elementValue, elementId);
            break;
    }
    calculatorRangeValueArray[elementId].value = elementValue;
    updateTextInput(elementId);
}

function calculateWeight(weight, index){
    return ((weight/calculatorData[index].Kcal)*100).toFixed(1);
}

function calculateXe(weight, index){
    return (((calculatorData[index].Carb/100)*weight)/15).toFixed(1);
}

function calculateKcalByWeight(weight, index){
    return ((weight*calculatorData[index].Kcal)/100).toFixed(1);
}

function calculateKcalByXe(xe, index){
    let weight = ((1500*xe)/calculatorData[index].Carb).toFixed(1);
    return calculateKcalByWeight(weight, index);
}

function resetInputs(index){
    calculatorRangeValueArray[index].value = 0;
    calculatorInputKcalArray[index].value = 0;
    calculatorInputWeightArray[index].value = 0;
    calculatorInputXeArray[index].value = 0;
    updateTextInput(index);
}

function generateId(){
    calculatorFieldsetArray.forEach((item,index)=>{
        item.setAttribute("id", calculatorData[index].id);
        calculatorRangeValueArray[index].setAttribute("id", calculatorData[index].id);
        calculatorInputKcalArray[index].setAttribute("id", calculatorData[index].id);
        calculatorInputWeightArray[index].setAttribute("id", calculatorData[index].id);
        return calculatorInputXeArray[index].setAttribute("id", calculatorData[index].id);
    })
}

function getMaxKcal(){
     return calculatorData.reduce(function(sum, current) {
        return sum + Number(current.MaxKcal);
    }, 0);
}
function setAllKcal(){
    calculatorMaxRangeValue.forEach((item,index)=>{
        item.innerHTML = calculatorData[index].MaxKcal;
        return calculatorRangeValueArray[index].setAttribute("max",calculatorData[index].MaxKcal);
    });
}

function calculateCurerntAll(array, value, index){
    array[index] = value;
    return array.reduce(function(sum, current) {
        return sum + Number(current);
    }, 0);
}