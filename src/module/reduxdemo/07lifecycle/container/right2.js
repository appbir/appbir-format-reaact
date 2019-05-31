import React from 'react';
import {connect,Logger} from 'frame'
import RightCounter from '../component/RightCounter.js'
import * as model from '../model/right2.js'

class RightCounterContainer extends React.Component {
	constructor(props) {
        super(props);
        Logger.info('RightCounterContainer22222222222 constructor props',props);
        let {setState,reciveValue} = this.props;
        setState({propsValue:reciveValue});
    }
    shouldComponentUpdate(nextProps, nextState){
        Logger.info('RightCounterContainer22222222222 shouldComponentUpdate nextProps, nextState',nextProps, nextState);
        let {setState,reciveValue} = nextProps;
        let {getState} = this.props;
        if(reciveValue != getState().reciveValue){
            setState({propsValue:reciveValue});
            return true;
        }
        return false;
    }
    componentWillUnmount(){
        Logger.info('RightCounterContainer22222222222222 componentWillUnmount');
    }
    render(){
        return (
            <div>
                <RightCounter {...this.props}/>
            </div>)
    }
}

export default connect(model)(RightCounterContainer);

