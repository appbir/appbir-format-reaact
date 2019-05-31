
let  setState;
let getState;
export const init=(set,get) => {
    setState = set;
    getState = get;
}

export const initState = {
    value:100,
    value1:99
};

// 增加
export const onIncrement = () => {
    setState({value:getState().value +1,value1:getState().value1 +3} );
}

// 减少
export const onDecrement = () =>{
     setState({value:getState().value -1,value1:getState().value1 -3} );
}

export const refreshValue = (val) => {
    setState({value:getState().value - val,value1:getState().value1 - val} );
}

