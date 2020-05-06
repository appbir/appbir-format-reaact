import React from 'react';
import { List, Checkbox } from 'antd'

// js 事件处理
// shit和点击时间处理

class EventDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: [],
      data: [
        { id: 0, text: 'Racing car sprays burning fuel into crowd.' },
        { id: 1, text: 'Japanese princess to wed commoner.' },
        { id: 2, text: 'Australian walks 100km after outback crash.' },
        { id: 3, text: 'Man charged over missing wedding girl.' },
        { id: 4, text: 'Los Angeles battles huge wildfires.' },
        { id: 5, text: 'Racing car sprays burning fuel into crowd.' },
        { id: 6, text: 'Japanese princess to wed commoner.' },
        { id: 7, text: 'Australian walks 100km after outback crash.' },
        { id: 8, text: 'Man charged over missing wedding girl.' },
      ]
    }
    this.initEvent();
  }

  initEvent = () => {
    // document类型
    document.onkeydown = this.onKeyDown;
    document.onkeypress = this.onKeyPress;
    document.onkeyup = this.onKeyUp;
  }
  // 在键盘上按下某个键时触发。如果按住某个键，会不断触发该事件，
  onKeyDown = (event) => {
    // console.log('onKeyDown');
    // 判断是否按住shift
    if(event.shiftKey){
      this.isShiftDown = true;
    }
  }
  // 释放某个键盘键时触发 该事件仅在松开键盘时触发一次，不是一个持续的响应状态。
  onKeyUp = (event) => {
    console.log('onKeyUp');
    this.isShiftDown = false;
    this.shiftRecodeId = false;
  }

  // 按下某个键盘键并释放时触发。如果按住某个键，会不断触发该事件。
  onKeyPress = (event) => {
    // console.log('onKeyPress');
  }

  setChecked = (id,isChecked)=>{
    let active = this.state.active.slice();
    if (isChecked) { // 添加选中
      active.push(id);
    } else { // 移除选中
      let index = active.indexOf(id);
      if (index != -1) {
        active.splice(index, 1);
      }
    }
    this.setState({ active })
  }
  // 计算shift按住时候的选中个数
  calcCheckedIds=(currentId)=>{
    // 默认按照当前选中的个数作为第一个位置
    // 计算标识的个数一个位置 -前后都可以获取多选
    let firstRecodeId  = this.shiftRecodeId;
    let ids = this.state.data.slice().map(item=>item.id);
    let firstIndex = ids.indexOf(firstRecodeId); // 标记位置
    let currentIndex = ids.indexOf(currentId); // 当前选中位置

    if(firstIndex > currentIndex){ // 前者大于当前选者时候 排序对调
      let temp = currentIndex;
      currentIndex= firstIndex;
      firstIndex = temp;
      // 向前移动两个
      firstIndex = firstIndex;
    }else{
      // 向后移动两个
      currentIndex = currentIndex;
    }
    // 获得截取的ids
    let selectIds = ids.slice(firstIndex,currentIndex+1);
    return selectIds;
  }

  onCheckboxChange = (id, event) => {
    let isChecked = event.target.checked;

    if(isChecked && this.isShiftDown){
      if(!this.shiftRecodeId){
        // 第一次选中 只处理选中
        this.shiftRecodeId  = id
        return  this.setChecked(id, isChecked);
      }
    }
    // 没有按住shift时候 设置单个选中
    if(!this.isShiftDown) return this.setChecked(id, isChecked);  
    // 按住shift时候，批量选中或者取消全选中
    let ids = this.calcCheckedIds(id);
    // 设置选中
   this.setState({active:ids})

  }

  render() {
    return (
      <div>
        <div>shift键+点击事件实现多选</div>
        <div>
          <List
            header={<div>Header</div>}
            bordered
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item>
                <div>
                  <Checkbox
                    checked={this.state.active.includes(item.id)}
                    onChange={this.onCheckboxChange.bind(this, item.id)}>
                    {item.id}
              </Checkbox>
                  <span>{item.text} </span>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>)
  }
}

export default EventDemo;