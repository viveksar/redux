import { resetProducts } from "../features/product/productslice";
import { removealltask } from "../features/task/taskslick";
import { reset } from "../features/counter/counterslice";

export const resetAllThunk=()=>{
    return (dispatch,getState)=>{
        dispatch(resetProducts())
        dispatch(removealltask())
        dispatch(reset())
    }
}