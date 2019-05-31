import React from 'react';
import {initialize} from '../50reusability/container/right.js'
let  Container2= initialize();

// 组件的生命周期
class Reusability extends React.Component {
    render(){
        return (<Container2/>)
    }
}
export default Reusability;

