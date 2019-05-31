import React from 'react';
import {connect,Logger} from './core/frame'
import LeftCounter from './component/LeftCounter.js'
import RightCounterContainer from './container/right.js'
import * as model from './model/index.js'
import PageLayout from './component/PageLayout.js'

/**
 *  属性传递和生命周期内如何操作
 */


// 组件的生命周期
class LifeCycleContainer extends React.Component {
    constructor(props) {
        super(props);
        Logger.info('constructor LifeCycleContainer',props);
    }
    render(){
    	let {onIncrement,onDecrement,value,refreshValue} = this.props;
        return (
            <PageLayout>
                <LeftCounter onIncrement = {onIncrement} onDecrement={onDecrement} value = {value}/>
                <RightCounterContainer refreshValue={refreshValue} reciveValue={value}/>
            </PageLayout>)
    }
}
export default connect(model)(LifeCycleContainer);

