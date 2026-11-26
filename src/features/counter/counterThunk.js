import { increment,increaseByAmount } from "./counterslice"
export const incrementByTwo=()=>{
    return (dispatch,getState)=>{
        const currentval=getState()
        let counterval=currentval.counter.value
        if (counterval<10){
            dispatch(increaseByAmount(2))
        }
    }
}