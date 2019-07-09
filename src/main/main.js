import React , {Component} from 'react';
import  Frame from 'frame';
import 'antd/dist/antd.min.css'
import './main.less';

import Left from  '@/index/menu';
import Header from  '@/index/setting';

Frame.init({
	//路由配置 URL地址--映射--文件  
	// 提取到对应的文件
    router:{
		routes:[
				{path:'/', component:()=>import('../module/login'),layout:false},
				{path:'/system/layout',component:()=>import('../module/index/layout')},
				{path:'/demo2',component:()=>import('../module/demo2')},
				{path:'/index',component:()=>import('../module/index')},
				{path:'/demo3',component:()=>import('../module/demo3')},
				{exact:false, component:()=>import('../module/index/404')}
			   ],
	}, 
	// 站点布局
    layout:{
        nodes:[Header,Left], // 需要其他元素继续添加节点
        config:{
			classNamePrefix:'appbir_',
			targetName:'appbir_ref',
			config:{
				header:{visiabled:true,width:'',height:'54px',fixed: true,zIndex:20},
				left:{visiabled:true,width:'80px',height:'FULL',fixed: false,zIndex:100},
				right:{visiabled:false,width:'87px',height:'',fixed: false,zIndex:10},
				content_header:{visiabled:false,width:'',height:'36px',fixed: false,zIndex:10},
				content:{visiabled:true,width:'',height:'',fixed: false,zIndex:10},
				bottom:{visiabled:false,width:'',height:'50px',fixed: false,zIndex:10}
			}
		}
    }
});

console.log(Frame);