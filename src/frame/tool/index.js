import getLayoutComp from './layout.jsx';
// 自定义框架提供的组件
export const init=()=>{
    return {
        LayoutConfig:getLayoutComp()
    }
}