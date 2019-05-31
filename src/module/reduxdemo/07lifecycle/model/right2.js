let getState;
let setState;
let props;

export const init=(set,get)=>{
    setState = set;
    getState = get;
}
export const initProps =(prop)=>{
    props = prop;
}   

export const initState = {
    propsValue:0,
    value:1
};

// 增加
export const onIncrement = () => {
    setState({value:getState().value + 1 });
}

// 减少
export const onDecrement = () => {
     setState({value:getState().value - 1} );
}

// 与其他组件交互
export const refreshOtherComponentValue = () => {
    props.refreshValue && props.refreshValue(getState().value);
}


