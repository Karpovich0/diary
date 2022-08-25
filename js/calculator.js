//CALCULATOR
//top progress bar
const caclculatorTopBarCurrent = document.querySelector(".calculator__dish-kcal-current");
const caclculatorTopBarMax = document.querySelector(".calculator__dish-kcal-max");
const caclculatorTopBarProgress = document.querySelector(".calculator__dish-progress-span");
//inputs
const calculatorRangeValueArray = document.querySelectorAll(".calculator__dish-range");
const calculatorInputKcalArray = document.querySelectorAll(".calculator__dish-input--kcal");
const calculatorInputWeightArray = document.querySelectorAll(".calculator__dish-input--weight");
const calculatorInputXeArray = document.querySelectorAll(".calculator__dish-input--xe");
//submit button
const calculatorFinalKcalSpan = document.querySelector(".calculator__dish-finish-kcal");
const calculatorFinalWeightSpan = document.querySelector(".calculator__dish-finish-weight");
//custom input range
const customRangeBarArray = document.querySelectorAll(".custom-range__progress-bar");
const customRangeThumbArray = document.querySelectorAll(".custom-range__thumb");
// reset button
const calculatorResetButtonArray = document.querySelectorAll(".calculator__dish-reset-button");
// show protein lipid and carb
const calculatorProteinNumber = document.querySelector(".calculator__dish-protein-number");
const calculatorLipidNumber = document.querySelector(".calculator__dish-lipid-number");
const calculatorCarbNumber = document.querySelector(".calculator__dish-carb-number");
const calculatorBreadNumber = document.querySelector(".calculator__dish-bread-number");
// hidden inputs
const calculatorProteinHidden = document.querySelector(".calculator__protein-hidden");
const calculatorLipidHidden = document.querySelector(".calculator__lipid-hidden");
const calculatorCarbHidden = document.querySelector(".calculator__carb-hidden");
// show max kcal
const calculatorMaxRangeValue = document.querySelectorAll(".custom-range__value--max");
// MULTY DISH
const calculatorFieldsetArray = document.querySelectorAll(".calculator__dish-fieldset");
// submit button
const calculatorSubmitButton = document.querySelector(".calculator__dish-button-submit");


let calculatorData = [{
    "id": "1",
    "date": "2022-08-15 18:55:54.008929",
    "Protein": 6,
    "Lipid": "10",
    "Carb": "4",
    "Kcal": "130",
    "MaxKcal": "850",
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
    "MaxKcal": "850",
    "MealType": "Завтрак",
    "MealTitle": "Овощная запеканка",
    "Gram": "",
    "MealID": "Le6eBZACS9enfXN2KFQqCg"
    }
]

generateData();
let calculatorMaxOfKcal = calculatorData[0].MaxKcal;
let calculatorRestKcal = calculatorMaxOfKcal;

let calculatorAllUsedKcal = new Array(calculatorData.length);

let calculatorAllCurrentKcal = new Array(calculatorData.length);
let calculatorAllCurrentWeight = new Array(calculatorData.length);

let calculatorAllCurrentProtein = new Array(calculatorData.length);
let calculatorAllCurrentLipid = new Array(calculatorData.length);
let calculatorAllCurrentCarb = new Array(calculatorData.length);
let calculatorAllCurrentXe = new Array(calculatorData.length);

caclculatorTopBarMax.innerHTML = calculatorMaxOfKcal;
// caclculatorTopBarMax.innerHTML = calculatorAllDishMaxKcal;
calculatorSetMaxKcal()
setAllKcal(0,0);
calculatorResetButtonArray.forEach((item, index)=>item.addEventListener("click", function(){
    resetInputs(index);
}));

calculatorAddEventListener(calculatorInputKcalArray);
calculatorAddEventListener(calculatorInputWeightArray);
calculatorAddEventListener(calculatorInputXeArray);

calculatorSubmitButton.addEventListener("click", function(event){
    if(calculatorRestKcal == calculatorMaxOfKcal){
        event.preventDefault();
    }
});

function updateTextInput(input) {
    let inputData; 

    if(isNaN(input)){
        inputData = Number(input.dataset.dishNumber);
    }else{
        inputData = input;
    };
    if(calculatorRangeValueArray[inputData].value===0.001){
       calculatorRangeValueArray[inputData].value = 0;
    }
    let kcalBuffer = calculatorRangeValueArray[inputData].value;
    let kcal = checkInput(kcalBuffer, inputData);
    setAllKcal(kcal, inputData);    
    
    customRangeThumbArray[inputData].style.left = ((kcal/calculatorData[inputData].MaxKcal)*100)+"%";
    customRangeBarArray[inputData].style.width = ((kcal/calculatorData[inputData].MaxKcal)*100)+"%";

    calculatorInputKcalArray[inputData].value = kcal;
    // write kcal on submit button
    let currentAllKcal = calculateCurerntAll(calculatorAllCurrentKcal, kcal, inputData);
    calculatorFinalKcalSpan.innerHTML = currentAllKcal;

    let weight = calculateWeight(kcal, inputData);
    
     // write weight on submit button
    let currentAllWeight = Math.round(calculateCurerntAll(calculatorAllCurrentWeight, weight, inputData));
    
    calculatorFinalWeightSpan.innerHTML = currentAllWeight;    
    calculatorInputWeightArray[inputData].value = weight;    

    let calculatorProtein = ((weight/100)*calculatorData[inputData].Protein).toFixed(1);
    let calculatorLipid = ((weight/100)*calculatorData[inputData].Lipid).toFixed(1);
    let calculatorCarb = ((weight/100)*calculatorData[inputData].Carb).toFixed(1);

    //fill protein carb and lipid
    calculatorProteinNumber.innerHTML = (calculateCurerntAll(calculatorAllCurrentProtein, calculatorProtein, inputData)).toFixed(1);
    calculatorProteinHidden.value = calculateCurerntAll(calculatorAllCurrentProtein, calculatorProtein, inputData);

    calculatorLipidNumber.innerHTML = (calculateCurerntAll(calculatorAllCurrentLipid, calculatorLipid, inputData)).toFixed(1);
    calculatorLipidHidden.value = (calculateCurerntAll(calculatorAllCurrentLipid, calculatorLipid, inputData)).toFixed(1);

    calculatorCarbNumber.innerHTML = (calculateCurerntAll(calculatorAllCurrentCarb, calculatorCarb, inputData)).toFixed(1);
    calculatorCarbHidden.value = (calculateCurerntAll(calculatorAllCurrentCarb, calculatorCarb, inputData)).toFixed(1);

    //fill top bar
    caclculatorTopBarCurrent.innerHTML = currentAllKcal;
    caclculatorTopBarProgress.style.width = ((currentAllKcal/calculatorMaxOfKcal)*100)+"%";

    let xeNumber = calculateXe(weight, inputData);
    calculatorInputXeArray[inputData].value = xeNumber;    
    calculatorBreadNumber.innerHTML = (calculateCurerntAll(calculatorAllCurrentXe, xeNumber, inputData)).toFixed(1);   
}

function changeTextInput(element) {
    let elementData = Number(element.dataset.dishNumber);
    let elementClassArray = element.className.split(" ");
    let elementValue = element.value;
    switch (elementClassArray[1]) {
        case "calculator__dish-input--weight":
            elementValue = calculateKcalByWeight(elementValue, elementData);
            break;
        case "calculator__dish-input--xe":
            elementValue = calculateKcalByXe(elementValue, elementData);
            break;
    }
    if(Number(elementValue)===0){
        calculatorRangeValueArray[elementData].value = elementValue+0.001; //if range value will be 0 it will jump to 50% of max value of kcal - to avoid this bug I used this condition. To check just comment this if-else and try to set 0 value for kcal input
    }else{
        calculatorRangeValueArray[elementData].value = elementValue;
    }
    updateTextInput(elementData);
}

function calculateWeight(weight, index){
    return Math.round((weight/calculatorData[index].Kcal)*100);
}

function calculateXe(weight, index){
    return (((calculatorData[index].Carb/100)*weight)/15).toFixed(1);
}

function calculateKcalByWeight(weight, index){
    return Math.round((weight*calculatorData[index].Kcal)/100);
}

function calculateKcalByXe(xe, index){
    let weight =  (1500*xe)/calculatorData[index].Carb;
    return calculateKcalByWeight(weight, index);
}

function resetInputs(index){
    calculatorRangeValueArray[index].value = 0;
    calculatorInputKcalArray[index].value = 0;
    calculatorInputWeightArray[index].value = 0;
    calculatorInputXeArray[index].value = 0;
    updateTextInput(index);
}

function generateData(){
    calculatorFieldsetArray.forEach((item,index)=>{
        item.setAttribute("data-dish-number", index);
        calculatorRangeValueArray[index].setAttribute("data-dish-number", index);
        calculatorInputKcalArray[index].setAttribute("data-dish-number", index);
        calculatorInputWeightArray[index].setAttribute("data-dish-number", index);
        return calculatorInputXeArray[index].setAttribute("data-dish-number", index);
    })
}

function setAllKcal(value, index){
    let sum = calculatorKcalSum(value, index);

    calculatorRestKcal = calculatorMaxOfKcal - sum;

    calculatorMaxRangeValue.forEach((item,index)=>{
        item.innerHTML = calculatorRestKcal;
    });
}

function calculateCurerntAll(array, value, index){
    array[index] = value;
    return array.reduce(function(sum, current) {
        return sum + Number(current);
    }, 0);
};

function calculatorAddEventListener(array){
    array.forEach((item)=>item.addEventListener("input",function(e){changeTextInput(e.target)}));
}

function checkInput(value, index){       
    let sum = calculatorKcalSum(value, index);
    
    if((sum - calculatorMaxOfKcal) > 0){
       sum = sum - calculatorAllUsedKcal[index];
       return calculatorMaxOfKcal - sum;
    }else{
        return value;
    }
}

function calculatorSetMaxKcal(){
    calculatorMaxRangeValue.forEach((item,index)=>calculatorRangeValueArray[index].setAttribute("max", calculatorMaxOfKcal)
    );
}

function calculatorKcalSum(value, index) {
    calculatorAllUsedKcal[index] = value;

    return calculatorAllUsedKcal.reduce(function(sum, current) {
        return sum + Number(current);
    }, 0);
}




