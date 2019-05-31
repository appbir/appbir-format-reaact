import React from 'react';
import {create} from '../30reusability/container/right.js'

let  Container2= create();

// 组件的生命周期
class Reusability extends React.Component {
    render(){
        return (<Container2/>)
    }
}
export default Reusability;

