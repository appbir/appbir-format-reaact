import React from 'react';
import {connect,Logger} from 'frame'
import LeftCounter from './component/LeftCounter.js'
// import RightCounterContainer from './container/right.js'
import RightCounterContainer from './container/right.js'
import * as model from './model/index.js'
import PageLayout from './component/PageLayout.js'

// 组件的生命周期
class LifeCycleContainer extends React.Component {
    constructor(props) {
        super(props);
        Logger.error('constructor LifeCycleContainer',props);
    }
    render(){
        let {onIncrement,onDecrement,value,refreshValue,namespace='default_nameSpace'} = this.props;
        return (
            <div> 
            <div>
                <center>不同路由下页面间复用</center>
                <hr/>
            </div>
                <PageLayout>
                    <LeftCounter onIncrement = {onIncrement} onDecrement={onDecrement} value = {value}/>
                    <RightCounterContainer namespace={namespace} refreshValue={refreshValue} reciveValue={value}/>
                </PageLayout>
            </div>)
    }
}

export default connect(model)(LifeCycleContainer);

export const create = ()=> connect(model)(LifeCycleContainer);
