presentNum = '';
pastNum = '';
Operation = '';

let Current = document.querySelector(".current-number");

let Previous = document.querySelector(".previous-number");





//Buttons---
let number = document.querySelectorAll(".number");
let operator = document.querySelectorAll(".operator");



//------------------------------


number.forEach((btn) =>{
    btn.addEventListener('click', (e) =>{
        handleNumber(e.target.textContent);



    });
});


operator.forEach((key) =>{
    key.addEventListener('click', (e) =>{
        Operator(e.target.textContent);
    });
});


function Operator(op){
    Operation = op;
    pastNum = presentNum;
    presentNum = '';
    Previous.textContent = pastNum + ' ' + Operation;
    Current.textContent = '';
    


}



function handleNumber(number){
    
    if (presentNum.length <= 15){
        presentNum += number;
        Current.textContent = presentNum;
        

    }


    
    
};





