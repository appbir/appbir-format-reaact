import React from 'react';
import DEMO1 from './demo1/index.js'
import DEMO2 from './demo2/index.js'
import DEMO3 from './demo3/indexall.js'


// 组件例子展示
class ReduxDemo5 extends React.Component {
    render(){
        return (
            <div>
                <DEMO1/>
                <DEMO2/>
                <DEMO3/>
                 {/* 命名空间用于处理复用场景 */}
                <DEMO3 namespace="appbir"/>
            </div>)
    }
}

export default ReduxDemo5;

