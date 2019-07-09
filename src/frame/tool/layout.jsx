/**
 *  布局配置内嵌组件 基于ant
 */
import React, { Component } from 'react';
import {connect} from "../connect"
import Content from './content.jsx'
import {LAYOUT} from '../reducer/layout';

class ContentContainer extends Component{
  render(){
    return  (<Content {...this.props}/>);
  }
}

const stateToProps= (mstate,state) => state.system.layout

const dispatchToProps = dispatch => ({ dispatch, 
    onChange:(key,value) => dispatch({type:LAYOUT.CHANGE_KEY,param:value,key:key})
});

export default ()=>{return connect(stateToProps, dispatchToProps)(ContentContainer)};

