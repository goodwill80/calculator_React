import { useState, useReducer } from 'react';
import { CalculatorReducer } from './reducer';

const startingState = {
    currentOperand: '',
    prevOperand: '',
    operation: '',
    overwrite: false
}

const Interger_Formatter = new Intl.NumberFormat("en-us", { maximumFractionDigits: 0});

const formateOperand = (operand)=>{
    if(operand === '') return;
    const [interger, decimal] = operand.split('.');
    if (decimal == null) return Interger_Formatter.format(interger);
    return `${Interger_Formatter.format(interger)}.${decimal}`;
}

function Calculator() {
    const btnStyle = "bg-blue-500 w-24 h-24 text-white border border-blue-200 hover:bg-blue-900 rounded-lg text-2xl p-4"
    const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(CalculatorReducer, startingState)

    const handleClick = (e)=> {
        dispatch({ type: "ADD_DIGIT" , digit: e.target.innerText });
    }

    const handleClear = ()=>{
        dispatch({ type: "CLEAR" });
    }

    const handleOperator = (e)=>{
        dispatch({type: "CHOOSE_OPERAND", operation: e.target.innerText})
    }

    const handleDelete = ()=>{
        dispatch({ type: "DELETE" })
    }

    const handleEvaluate = ()=>{
        dispatch({ type: "EVALUATE"});
    }
    

  return (
    <div className="flex flex-col justify-center items-center w-1/3 m-auto">

        <div className='relative bg-black h-28 text-white flex flex-col justify-around items-end text-lg rounded-lg' style={{width: "405px"}}>
            <div className="mr-4">
                { formateOperand(prevOperand) } { operation }
            </div>
            <div className="mr-4 text-5xl">
                { formateOperand(currentOperand) }
            </div>
            <div className="absolute left-0 top-0 p-4 text-sm text-yellow-200">
                Casio Fx-123
            </div>
          
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2">
        <button className={btnStyle} onClick={handleClick}>7</button>
        <button className={btnStyle} onClick={handleClick}>8</button>
        <button className={btnStyle} onClick={handleClick}>9</button>
        <button className={btnStyle} onClick={handleOperator}>/</button>
        <button className={btnStyle} onClick={handleClick}>4</button>
        <button className={btnStyle} onClick={handleClick}>5</button>
        <button className={btnStyle} onClick={handleClick}>6</button>
        <button className={btnStyle} onClick={handleOperator}>x</button>
        <button className={btnStyle} onClick={handleClick}>1</button>
        <button className={btnStyle} onClick={handleClick}>2</button>
        <button className={btnStyle} onClick={handleClick}>3</button>
        <button className={btnStyle} onClick={handleOperator}>-</button>
        <button className={btnStyle} onClick={handleClick}>0</button>
        <button className={btnStyle} onClick={handleClick}>.</button>
        <button className={btnStyle} onClick={handleOperator}>+</button>
        <button className={btnStyle} onClick={handleEvaluate}>=</button>
        <button className="bg-blue-500 w-24 h-24 text-white border border-blue-200 hover:bg-blue-900 rounded-lg text-2xl p-4"
        onClick={handleClear}>Clear</button>
        <button className="bg-blue-500 w-24 h-24 text-white border border-blue-200 hover:bg-blue-900 rounded-lg text-2xl p-4"
        onClick={handleDelete}>Delete</button>
   
        </div>
    </div>
  )
}

export default Calculator;



// 