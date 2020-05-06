import React from 'react';
import Frame from 'frame';
import 'antd/dist/antd.min.css'

import './main.less';

import Left from '@/menu';
import Header from '@/setting';

Frame.init({
	//路由配置 URL地址--映射--文件  
	// 提取到对应的文件
	router: {
		routes: [
			// {path:'/', exact:true, component:()=>import('../module/login'),layout:false},
			{ path: '/event', exact: true, component: () => import('../module/event') },
			{ path: '/demo2', exact: true, component: () => import('../module/demo2') },
			{ path: '/index', exact: true, component: () => import('../module/index') },
			{ path: '/demo3', exact: true, component: () => import('../module/demo3') },
			// 个人图标制作
			{ path: '/css', exact: true, component: () => import('../module/css') },
			{ path: '/transform', exact: true, component: () => import('../module/transform') },
			{ exact: false, component: () => import('../module/404') }
		],
	},
	// 站点布局
	layout: {
		nodes: [Header, Left],
		config: {
			classNamePrefix: 'appbir_',
			targetName: 'appbir_ref',
			config: {
				header: { visiabled: false, width: '', height: '54px', fixed: true, zIndex: 20 },
				left: { visiabled: true, width: '0px', height: 'FULL', fixed: true, zIndex: 100 },
				right: { visiabled: false, width: '87px', height: '', fixed: false, zIndex: 10 },
				content_header: { visiabled: false, width: '', height: '36px', fixed: false, zIndex: 10 },
				content: { visiabled: true, width: '', height: '', fixed: false, zIndex: 10 },
				bottom: { visiabled: false, width: '', height: '50px', fixed: false, zIndex: 10 }
			}
		}
	}
});

console.log(Frame);