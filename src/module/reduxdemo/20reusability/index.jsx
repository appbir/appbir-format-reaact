import React from 'react';
import Counter1 from './container/right.js'
// 组件的生命周期
class LifeCycleContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (<Counter1/>)
    }
}
export default LifeCycleContainer;
