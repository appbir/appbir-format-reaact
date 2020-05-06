import React from 'react';
import './index.less';

class Menu extends React.Component {
  render() {
    return (
      <div>
        <div>手绘个性化图标</div>
        <div className="center">
          <div style={{ width: '200px', height: '200px', background: 'antiquewhite' }}>
            <div className="appbir-logo">
              <div className="one-leaf">
                <div className="trapezium" />
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
}

export default Menu;