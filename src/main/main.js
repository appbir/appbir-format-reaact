import React , {Component} from 'react';
import  Frame from '../frame/frame';

const Header= ()=><div> header</div>

class Left extends Component {
    render= ()=> <div> left</div>
}

Frame.init({
	//路由配置 URL地址--映射--文件  
	// 提取到对应的文件
    router:{
		routes:[
				{path:'/', component:()=>import('../module/demo/index.jsx'),layout:false},
				{path:'/demo2',component:()=>import('../module/demo2/index.jsx')},
				{path:'/demo3',component:()=>import('../module/demo3/index.jsx')},
				{exact:false, component:()=>import('../module/404/index.jsx')}
			   ],
	}, 
	// 站点布局
    layout:{
        nodes:[Header,Left],
        config:{
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
    }
});