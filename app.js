const initialPriceInput = document.querySelector("#initial-price");
const noOfStocksInput = document.querySelector("#no-of-stocks");
const currentPriceInput = document.querySelector("#current-price");
const submitBtn = document.querySelector("#submit-btn");
const output = document.querySelector("#output");

function showMessage(message, finalMessage){
    output.innerText = message;
    switch (finalMessage) {
        case "INCORRECTINPUT":
        case "NOPROFITNOLOSS":
            output.style.backgroundColor = "blue";
            // make the color blue
            break;
        case "PROFIT":
            output.style.backgroundColor = "green";
            // make the color green
            break;
        case "LOSS":
            output.style.backgroundColor = "red";
            // make the color red
            break;
        default:
            break;
    }

}

function validateInput(iniPrice, noOfStocks, currPrice){
    if (iniPrice.length === 0){
        showMessage("Please Give Initial Price", "INCORRECTINPUT");
        return false;            
    }
    if (noOfStocks.length === 0){
        showMessage("Please Give No oF Stocks", "INCORRECTINPUT");
        return false;            
    }
    if (currPrice === undefined){
        showMessage("Please Give Current Price", "INCORRECTINPUT");
        return false;            
    }
    if( (Number(iniPrice) < 1) || (Number(noOfStocks) < 1) || (Number(currPrice) < 1)){
        showMessage("Input Can't be 0 or -ve", "INCORRECTINPUT");
        return false;
    }
    return true;
}

function findProfitLoss(iniPrice, noOfStocks, currPrice){
    op = ["", ""];
    if(iniPrice > currPrice){
        // bought costlier than current - LOSS
        const loss = (iniPrice - currPrice) * noOfStocks;
        const lossPercent = (loss/iniPrice) * 100;
        op[0] = "Uh Oh! You are currently at loss of " + loss + " which is " + lossPercent.toFixed(2) + "%";
        op[1] = "LOSS";
    }else if(iniPrice < currPrice){
        // bought cheaper than current - PROFIT
        const profit = (currPrice - iniPrice) * noOfStocks;
        const profitPercent = (profit/iniPrice) * 100;
        op[0] = "Wowww! You are at profit of " + profit + " which is " + profitPercent.toFixed(2) + "%";
        op[1] = "PROFIT";
    }else{
        op[0] = "No pain, No Gain and No Gain, No pain";
        op[1] = "NOPROFITNOLOSS";
    }
    return op;
}

function calculator(){
    if(validateInput(initialPriceInput.value, noOfStocksInput.value, currentPriceInput.value)){
        const op = findProfitLoss(Number(initialPriceInput.value), Number(noOfStocksInput.value), Number(currentPriceInput.value));
        showMessage(op[0], op[1]);
    }
}

submitBtn.addEventListener("click", calculator);
