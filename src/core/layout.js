import React, {Component} from 'react';
import Layout from 'appbir-layout';
import Setting from '../module/setting';
import Menu from '../module/rmenu/index.jsx';

class PageLayout extends Component {
	render(){
		let prop = {
			classNamePrefix:'r_',
			targetName:'l_ref',
			config:{
				header:{visiabled:true,width:'',height:'54px',fixed: true,zIndex:20},
				left:{visiabled:true,width:'68px',height:'FULL',fixed: true,zIndex:100},
				right:{visiabled:false,width:'87px',height:'',fixed: false,zIndex:10},
				content_header:{visiabled:false,width:'',height:'36px',fixed: false,zIndex:10},
				content:{visiabled:true,width:'',height:'',fixed: false,zIndex:10},
				bottom:{visiabled:false,width:'',height:'50px',fixed: false,zIndex:10}
			}
		}
		return (
			<div className="appbir-PageLayout-content">
				{/* // TODO 全局组件挂载位置*/}
				<Layout {...prop}>
					{this.props.children}
					{/*整站布局挂载组件*/}
					<Setting/>
					<Menu/>
				</Layout>
			</div>);
	}
}


export default PageLayout;