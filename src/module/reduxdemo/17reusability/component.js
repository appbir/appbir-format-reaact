import React from 'react';
import {connect} from 'frame'


// 组件的生命周期
class APPClass extends React.Component {
    constructor(props) {
        super(props);
        debugger;
    }
    render(){
        debugger;
        let {model,wrapContent,...props} = this.props;
        let Instance = connect(model)(wrapContent);
        return  <Instance {...props}/>
    }
}

export const Component = APPClass;