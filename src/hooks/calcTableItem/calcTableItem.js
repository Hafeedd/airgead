


const calcTableItem = (state,setState) =>{
    let tempState = {...state}
    if(tempState.discount_1_percentage !== 0 && tempState.discount_1_amount){
        tempState = {...tempState,discount_1_percentage:''}
    }
    Object.entries(tempState).map(([key, value])=> {if(value == "")tempState[key] = 0})
    // console.log(tempState)
    if(tempState.quantity && tempState.rate){
        tempState = {...tempState,value:tempState.quantity*tempState.rate,
        total:tempState.quantity*tempState.rate}
        if(tempState.discount_1_percentage || tempState.discount_1_percentage == 0){
            // console.log(tempState.discount_1_percentage)
            tempState = {...tempState,discount_1_amount:tempState.value-(tempState.value-(state.discount_1_percentage*(tempState.value/100)))}
        }

        if(tempState.value && state.discount_1_amount){
            // tempState.discount_1_amount = parseFloat(tempState.discount_1_amount)
            tempState = {...tempState,['value']:tempState.quantity*tempState.rate-tempState.discount_1_amount,
                }
        }

        if(tempState.discount_1_amount || tempState.discount_1_amount == 0){
            console.log(tempState.discount_1_amount)
            console.log((tempState.discount_1_amount/tempState.value)*100)
            tempState = {...tempState,discount_1_percentage:(state.discount_1_amount/tempState.value)*100}
        }
    }
    
    // Object.entries(tempState).map(([key, value])=> {if(value == 0)tempState[key] = ''})
        setState(tempState)
}

export default calcTableItem