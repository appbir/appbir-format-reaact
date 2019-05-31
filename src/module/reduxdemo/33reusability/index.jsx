import React from 'react';
import {create} from '../30reusability/container/right.js'

let  Container3= create();

// 组件的生命周期
class Reusability extends React.Component {
    render(){
        return (<div>
            <Container3/>
            </div>)
    }
}
export default Reusability;

