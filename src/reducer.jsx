const evaluate = ({ currentOperand, prevOperand, operation})=>{
    const prev = parseFloat(prevOperand);
    const current = parseFloat(currentOperand);
    if(isNaN(prev) && isNaN(current)) return '';
    let computation ='';
    switch(operation) {
        case "+":
            computation = prev + current;
            break
        case "-":
            computation = prev - current;
            break
        case "x":
            computation = prev * current;
            break
        case "/":
            computation = prev / current;
            break
    }
    return computation.toString();
}

export const CalculatorReducer = (state, action)=>{
    switch(action.type) {
        case "ADD_DIGIT":
            if( action.digit === '0' && state.currentOperand === '0') return state;
            if( action.digit === '.' && state.currentOperand.includes('.') ) return state;
            if( state.overwrite) {
                return {
                    ...state,
                    currentOperand: action.digit,
                    overwrite: false
                }
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand}${action.digit}`
            }
        case "CLEAR":
            return { currentOperand: '', prevOperand: '', operation: '' }
        case "CHOOSE_OPERAND":
            if( state.currentOperand === "" && state.prevOperand === "") return state;
            if( state.currentOperand === "") {
                return {
                    ...state,
                    operation: action.operation
                }
            }
            if ( state.prevOperand === "" ) {
                 return {
                     ...state,
                     operation: action.operation,
                     currentOperand: "",
                     prevOperand: state.currentOperand
                 }
            }
            return {
                ...state,
                operation: action.operation,
                prevOperand: evaluate(state),
                currentOperand: ''
            }
        case "DELETE":
            if(state.currentOperand ==="") return state;
            if(state.overwrite) {
                return {
                    ...state,
                    currentOperand: "",
                    overwrite: false
                }
            }
            if(state.currentOperand.length === 1) {
                return { ...state, currentOperand: '' }
            }
            return {
                ...state, currentOperand: state.currentOperand.slice(0, -1)
            }
        case "EVALUATE":
            if(state.operation === "" || state.currentOperand ==="" || state.prevOperand ===""){
                return state
            }
            return {
                ...state,
                operation: "",
                prevOperand: "",
                currentOperand: evaluate(state),
                overwrite: true
            }
        default: return state;
    }
}