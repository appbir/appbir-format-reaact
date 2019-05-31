


let props;
export const initProps =(prop)=>{
    props = prop;
}   

export const moduleName="moduleName";

export const initState = {
    propsValue:0,
    value:1
};

// 增加
export const onIncrement = () =>(setState,getState)=> {
    setState({value:getState().value + 1 });
}

// 减少
export const onDecrement = () => (setState,getState)=>{
     setState({value:getState().value - 1} );
}

// 与其他组件交互
export const refreshOtherComponentValue = () =>(setState,getState)=> {
    props.refreshValue && props.refreshValue(getState().value);
}


