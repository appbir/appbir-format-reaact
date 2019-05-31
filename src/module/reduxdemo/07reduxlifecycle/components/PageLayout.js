// 无状态组件
import React from 'react';
import './page-layout.css'

const PageLayout = ({className,children,leftClass}) => {
  const getRenderChildren=()=>{
    let renderChildren = [];
    if (children.length===3){
       renderChildren.push((<div key="left-before" className="left-before">{children[0]}</div>));
       renderChildren.push((<div key="left"  className={'left ' +leftClass}>{children[1]}</div>));
       renderChildren.push((<div key="right" className="right">{children[2]}</div>));
     } else if(children.length===2){
       renderChildren.push((<div key="t_left" className={'left ' + leftClass}>{children[0]}</div>));
       renderChildren.push(<div key="t_right" className="right">{children[1]}</div>);
     }else{
       renderChildren.push((<div key="all" className='all'>{children}</div>));
     }
     return renderChildren;
  }

  return (
    <div className={'riil-page-layout ' + (className || '') }>
       {getRenderChildren()}
    </div>
  )
}

export default PageLayout;
