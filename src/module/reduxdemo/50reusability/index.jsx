import React from 'react';
import {initialize} from './container/right.js'
let Counter1 = initialize();

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
