/*********************************************************************************
 *                                 系统动态布局
 **********************************************************************************
 */
import React, {Component} from 'react';
import Layout from 'appbir-layout';
import {connect} from './connect';
const noop = () => null;
class PageLayout extends Component {
	constructor(props){
		super(props);
	}
	render(){
		// layou 排序规则
		// PARTS.CONTENT,PARTS.HEADER,PARTS.LEFT,PARTS.RIGHT,PARTS.BOTTOM,PARTS.CONTENT_HEADER];
		let nodes = this.props.nodes;
		let Header = nodes[0] || noop;
		let Left = nodes[1] || noop;
		let Right = nodes[2] || noop;
		let BOTTOM = nodes[3] || noop;
		let CONTENT_HEADER = nodes[4] || noop;
		let config = this.props.config;
		return (
			<div className="appbir-project-layout">
				<Layout {...config}>
					{this.props.children}
					<Header/>
					<Left/>
					<Right/>
					<BOTTOM/>
					<CONTENT_HEADER/>
				</Layout>
			</div>);
	}
}
const stateToProps = (mState,state) => {
	return {config:state.system.layout};
}
const dispatchToProps = dispatch => ({dispatch});
export default connect(stateToProps,dispatchToProps)(PageLayout);