import { SETPOSITION, SETINPUTVALUE, REMOVEINPUTVALUE } from "./actionTypes";


export const setPos = (po)=>{
    return {
        type : SETPOSITION,
        data : po
    }
}

export const setValue = (value) => {
    return {
      type: SETINPUTVALUE,
      data : value
    };
}

export const remValue = () => {
    return {
      type: REMOVEINPUTVALUE,
    };
}