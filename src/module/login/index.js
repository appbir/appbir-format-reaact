import React, { Component } from 'react';
import {Button} from 'antd';
import './index.less';
import Frame  from 'frame';
let {Router:{redirect}} = Frame;

class ReactBoilerplate extends Component {

    login=()=> redirect('/index');

    render() {
      return (<div className="login">
                <h1>Hello, Wellcome Appbir React ReactBoilerplate</h1>
                <Button type="primary" onClick={this.login}>登录</Button>
            </div>)
    }
  }

export default ReactBoilerplate;