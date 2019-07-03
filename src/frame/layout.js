/*********************************************************************************
 *                                 系统动态布局
 **********************************************************************************
 */
import React, {Component} from 'react';
import Layout from 'appbir-layout';
const noop = () => null;
class PageLayout extends Component {
	// TODO 后续考虑扩展 外部通过方法设置 内部状态 改变布局
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
			<div className="appbir-PageLayout-content">
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


export default PageLayout;