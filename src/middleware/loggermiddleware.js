const loggerMiddleware= store=>next=>action=>{
    console.log("previous state:",store.getState())
    console.log("dispatched action:",action)
    
    let result=next(action)
    console.log("here is the result:",result)
    console.log("updated state:",store.getState())
    return result
}

export default loggerMiddleware