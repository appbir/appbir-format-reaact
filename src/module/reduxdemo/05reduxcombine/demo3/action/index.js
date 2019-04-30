export const onIncrement = (param,other)=>(dispatch,getState)=>{
    console.log('onIncrement',param,other,dispatch,getState)
    dispatch({type:'INCREMENT3'})
}

export const onDecrement = (_dispatch)=>{
    console.log('onDecrement',arguments)
    return (dispatch,getState)=>{
        _dispatch({type:'DECREMENT3'})
        console.log('onDecrement',dispatch,getState)
    }
}

export const incrementIfOdd = ()=>(dispatch,getState)=>{
    console.log('incrementIfOdd')
    dispatch({type:'INCREMENT3'})
}

export const incrementAsync=()=>(dispatch,getState)=>{
    console.log('incrementAsync')
    dispatch({type:'DECREMENT3'})
}