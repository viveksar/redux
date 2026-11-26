import { useDispatch, useSelector } from "react-redux"
import { increment,decrement ,reset,increaseByAmount} from "./features/counter/counterslice"
import { addtask,removealltask } from "./features/task/taskslick"
import { useState,useEffect } from "react"
import { prevpage,nextpage,updateAllProducts, setProductDetailid,fetchProductDetail } from "./features/product/productslice"
import { incrementByTwo } from "./features/counter/counterThunk"
import { resetAllThunk } from "./thunk/resetAllThunk"


function App() {

  useEffect(()=>{
//     fetch('https://fakestoreapi.com/products')
//   .then(response => response.json())
//   .then(data => {console.log(data);
// dispatch(updateAllProducts(data))
//   });

  dispatch( async ()=>{
  console.log("dispatch function is called here")
//       fetch('https://fakestoreapi.com/products')
//   .then(response => response.json())
//   .then(data => {console.log(data);
// dispatch(updateAllProducts(data))})

try{
let data=await fetch('https://fakestoreapi.com/products')
data=await data.json()
dispatch(updateAllProducts(data))
}catch(e){
console.log("some error has occured in fetching:",e)
}
})
  },[])


const counterValue=useSelector((state)=>{return state.counter.value})
const {product_details_loading,product_detail_error,product_details}=useSelector((state)=>state.products)
const tasks=useSelector((state)=> state.tasks.tasks)
let dispatch=useDispatch()
let [inputval,setinputval]=useState(0)
const [taskvalue,setTaskvalue]=useState("")
let handleincrement=()=>{
  console.log("increment clicked")
  dispatch(increment())
}
let handledecrement=()=>{
  console.log("decrement clicked")
  dispatch(decrement())
}
let handleTask=()=>{
  console.log("handle task clicked here:",taskvalue)
  dispatch(addtask(taskvalue))
  setTaskvalue("")
}

const[productid,setProductid]=useState("")

const products=useSelector((state)=>{return state.products.products})
const page=useSelector((state)=>{return state.products.page})
  return (
    
    <div>
      <button onClick={()=>{dispatch(resetAllThunk())}}>Remove All data from This page</button>
        ===========================================================================
      <br/>
      
    <button onClick={handleincrement}>+</button>
    <button onClick={()=>{dispatch(incrementByTwo())}}>Increment by two</button>
    <p>Count:{counterValue}</p>
    <button onClick={handledecrement}>-</button>
    <br/>
    <button onClick={()=>{dispatch(reset())}}>Reset</button>
    <br></br>
    <input placeholder="enter value to increment" onChange={(e)=>{setinputval(e.target.value)}} type="number"value={inputval}></input>
    <br/>
    <button onClick={()=>{dispatch(increaseByAmount(inputval))}}>Add input value</button>
    <br/>
    ===========================================================================
    <br/>
    <input placeholder="input id to get the product details" value={productid}onChange={(e)=>{setProductid(e.target.value)}}></input>
    <button onClick={()=>{setProductid("");dispatch(fetchProductDetail(productid))}}> Get Product Detail</button>
    {product_details_loading&&<div>Product details loading</div>}
    {product_detail_error&&<div>{product_detail_error}</div>}
    {product_details&&<div>{product_details.title}</div>}
    <br/>
    ===========================================================================
    <div>
      <input value={taskvalue} onChange={(e)=>{setTaskvalue(e.target.value)}} placeholder="enter the task here"></input>
      <button onClick={handleTask}>Add Task</button>
      <br/>
    </div>
    {tasks&& tasks.map((item)=>{
      return <div>{item}</div>
    })}
    <br/>
    <button onClick={()=>{dispatch(removealltask())}}>Remove All</button>
    <br/>
    ===========================================================================
    {products&&products.map((item,index)=>{
      return <><div key={index}>{item.title}</div><br/></>
    })}
    <div>page no:{page}</div>
    <button onClick={()=>{dispatch(nextpage())}}>Next Page</button>
    <button onClick={()=>{dispatch(prevpage())}}>Previous Page</button>
    </div>
  
  )
}

export default App
