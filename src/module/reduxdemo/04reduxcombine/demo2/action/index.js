export const onIncrement = (param,other)=>(dispatch,getState)=>{
    console.log('onIncrement',param,other,dispatch,getState)
    dispatch({type:'INCREMENT2'})
}

export const onDecrement = ()=>{
    console.log('onDecrement',arguments)
    return (dispatch,getState)=>{
        dispatch({type:'DECREMENT2'})
        console.log('onDecrement',dispatch,getState)
    }
}

export const incrementIfOdd = ()=>(dispatch,getState)=>{
    console.log('incrementIfOdd')
    dispatch({type:'INCREMENT2'})
}

export const incrementAsync=()=>(dispatch,getState)=>{
    console.log('incrementAsync')
    dispatch({type:'DECREMENT2'})
}