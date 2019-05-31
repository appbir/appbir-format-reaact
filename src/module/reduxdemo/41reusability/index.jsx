import React from 'react';
// import {create} from '../40reusability/container/right.js'

// let  Container2= create();
import {instance as Container2} from '../40reusability/container/right.js';

// 组件的生命周期
class Reusability extends React.Component {
    render(){
        return (<Container2/>)
    }
}
export default Reusability;

