
import {merge} from '../utils';

export const LAYOUT = {
    SET:'SYS_LAYOUT_SET',
    SET_CONFIG:'SYS_LAYOUT_SET_CONFIG',
    CHANGE_KEY:'SYS_LAYOUT_CHANGE_KEY'
}
// 布局初始化状态
const initState = {
    classNamePrefix:'appbir-layout-',
    targetName:'appbir-ref',
    config:{
        header:{visiabled:true,width:'',height:'54px',fixed: true,zIndex:20},
        left:{visiabled:true,width:'80px',height:'AUTO',fixed: true,zIndex:100},
        right:{visiabled:false,width:'87px',height:'',fixed: false,zIndex:10},
        content_header:{visiabled:false,width:'',height:'36px',fixed: false,zIndex:10},
        content:{visiabled:true,width:'',height:'',fixed: false,zIndex:10},
        bottom:{visiabled:false,width:'',height:'50px',fixed: false,zIndex:10}
    }
};

export default (state=initState, action) => {
    switch (action.type) {
        case LAYOUT.SET:
            return merge(state, action.param);
        case LAYOUT.SET_CONFIG:
            return merge(state, {config:action.param});
        case LAYOUT.CHANGE_KEY:
            return state.setIn(['config'].concat(action.key),action.param);
        default:
            return state;
    }
}
