import React from 'react';
import {connect,Logger} from 'frame'
import RightCounter from '../component/RightCounter.js'
import * as model from '../model/right.js'
import {Component} from '../component.js'
class RightCounterContainer extends Component {
	constructor(props) {
        super(props);
        Logger.info('RightCounterContainer constructor props',props);
        let {setState,reciveValue} = this.props;
        (typeof reciveValue != 'undefined') && setState({propsValue:reciveValue});
    }
    shouldComponentUpdate(nextProps, nextState){
        Logger.info('RightCounterContainer shouldComponentUpdate nextProps, nextState',nextProps, nextState);
        return true;
    }
    componentWillUnmount(){
        Logger.info('RightCounterContainer componentWillUnmount');
    }
    render(){
        return (
            <div>
                <RightCounter {...this.props}/>
            </div>)
    }
}

export default connect(model)(RightCounterContainer);

