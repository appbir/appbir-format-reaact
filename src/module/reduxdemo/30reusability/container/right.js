import React from 'react';
import {connect,Logger} from 'frame'
import RightCounter from '../component/RightCounter.js'
import * as model from '../model/right.js'

class RightCounterContainer extends React.Component {
	constructor(props) {
        super(props);
        Logger.info('RightCounterContainer constructor props',props);
        let {setState,reciveValue} = this.props;
        setState({propsValue:reciveValue});
    }
    shouldComponentUpdate(nextProps, nextState){
        let {setState,reciveValue} = nextProps;
        setState({propsValue:reciveValue});
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

Logger.frame('info',"--------------------------default connect");
export default connect(model)(RightCounterContainer);


export const create  =() =>{
    return connect(model)(RightCounterContainer)
};
