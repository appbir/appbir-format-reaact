
let  setState;
let getState;
export const init=(set,get) => {
    setState = set;
    getState = get;
}


export const initState = {
    value:100
};

// 增加
export const onIncrement = () => {
    setState({value:getState().value +1} );
    setState({propsValue:getState('moduleName',{namespace:'namespace'}).propsValue +100},
             {moduleName:'moduleName',namespace:'namespace'});
}

// 减少
export const onDecrement = () =>{
     setState({value:getState().value -1} );
     setState({propsValue:getState('moduleName',{namespace:'namespace'}).propsValue - 100},
                {moduleName:'moduleName',namespace:'namespace'});
}

export const refreshValue = (val) => {
    setState({value:getState().value - val} );
}

