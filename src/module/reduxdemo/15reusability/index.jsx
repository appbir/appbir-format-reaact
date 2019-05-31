import React from 'react';
import {connect,Logger} from 'frame'
import LeftCounter from './component/LeftCounter.js'
import RightCounterContainer from './container/right.js'
import * as model from './model/index.js'
import PageLayout from './component/PageLayout.js'

// 组件的生命周期
class LifeCycleContainer extends React.Component {
    constructor(props) {
        super(props);
        Logger.info('constructor LifeCycleContainer',props);
    }
    render(){
        let {onIncrement,onDecrement,value,refreshValue,namespace} = this.props;
        return (
            <div> 
            <div>
                <center>同一个页面复用多个组件</center>
                <hr/>
            </div>
                <PageLayout>
                    <LeftCounter onIncrement = {onIncrement} onDecrement={onDecrement} value = {value}/>
                    <RightCounterContainer refreshValue={refreshValue} reciveValue={value}/>
                    <RightCounterContainer namespace='namespace' refreshValue={refreshValue}/>
                </PageLayout>
            </div>)
    }
}
export default connect(model)(LifeCycleContainer);

