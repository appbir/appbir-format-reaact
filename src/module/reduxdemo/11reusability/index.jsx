import React from 'react';

import Container2 from '../10reusability/container/right.js'
import {create} from '../10reusability/container/right.js'
let ReusabilityContainer = create();
// 组件的生命周期
class Reusability extends React.Component {
    render(){
        return (<ReusabilityContainer/>)
    }
}
export default Reusability;

