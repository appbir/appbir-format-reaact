import React from 'react';
import './index.less';
import UnitSelect from './unitSelect'
import { objToCss } from './utils'
import {
  UNIT, UNIT_VALUE, POSITION, TRANSFORM_AGUMENTS, INNER_X_STR,
  INNER_Y_STR, UNIT_TYPE_Z, INNER_ALL_STR
} from './const'
import { transformOriginTips, transformTips } from './tooltips';

import { Input, Select, Button, Icon, Switch, Tooltip } from 'appbir';
const InputGroup = Input.Group;
const { Option } = Select;

import TransformFuntions from './transform_functions.js';

class Transform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 页面控制部分
      isShowCode: true,
      // 页面显示增强演示效果
      trnasformOriginAnimate: false,
      // ---------------------------------------------
      // -----------transformOrigin 属性--------------
      // ---------------------------------------------
      argumentSum: 3, // 参数个数
      // X轴数据
      unitx: {
        unit: UNIT.PERCENTAGE, // 类型
        value: 50, // 值
        unitValue: UNIT_VALUE.PERCENT // 单位值
      },
      unity: {
        unit: UNIT.PERCENTAGE, // 类型
        value: 50, // 值
        unitValue: UNIT_VALUE.PERCENT, // 单位值
        valueData: INNER_Y_STR,
      },
      unitz: {
        unit: UNIT.LENGTH, // 类型
        value: 0, // 值
        unitValue: UNIT_VALUE.PX, // 单位值
        typeData: UNIT_TYPE_Z,
      }
    }
  }

  // 根据设置获取对应的CSS的元素代码
  //styleObj : 两种形式- 一种 Object 适应与react渲染元素显示
  //cssCode: 一种是字符串格式，标准css样式字符串
  getCodeStyle = () => {
    let { argumentSum, unitx, unity, unitz } = this.state;
    let styleObj = {};
    let cssCode = '';
    let x = unitx.value + unitx.unitValue;
    let y = unity.value + unity.unitValue;
    let z = unitz.value + unitz.unitValue;
    styleObj.transformOrigin = argumentSum !== 1 ? argumentSum !== 2 ? [x, y, z].join(' ') : [x, y].join(' ') : x;
    return {
      cssCode: objToCss(styleObj),
      styleObj
    }
  }


  // ------------------------------------------------
  // -----------transformOrigin 相关方法--------------
  // ------------------------------------------------

  // 计算 瞄准线位置
  getCrossHairStyle = () => {
    let width = 320;
    let height = 320;
    let crossHeight = 24 / 2;
    let crossWidth = 24 / 2;
    let halfHeight = height / 2 - crossHeight;
    let halfWidth = width / 2 - crossWidth;
    let allHeight = height - crossHeight;
    let allWidth = width - crossWidth;
    let { argumentSum, unitx, unity, unitz } = this.state;
    let left = 0;
    let top = 0;

    if (argumentSum === 1) { // 一维
      if (unitx.unit === UNIT.INNER_STR) {// 内置类型
        if (unitx.value === POSITION.CENTER) {
          left = halfHeight;
          top = halfHeight;
        } else if (unitx.value === POSITION.TOP) {
          left = halfWidth;
          top = -crossHeight;
        } else if (unitx.value === POSITION.RIGHT) {
          left = allWidth;
          top = halfHeight;
        } else if (unitx.value === POSITION.BOTTOM) {
          left = halfWidth;
          top = allHeight;
        } else if (unitx.value === POSITION.LEFT) {
          left = -crossWidth;
          top = halfHeight;
        }
        left = left + UNIT_VALUE.PX;
        top = top + UNIT_VALUE.PX;
      } else if (unitx.unit === UNIT.LENGTH) {
        top = halfHeight;
        left = unitx.value - crossWidth;
        top = top + unitx.unitValue;
        left = left + unitx.unitValue;
      } else if (unitx.unit === UNIT.PERCENTAGE) {
        top = halfHeight;
        left = width * unitx.value / 100 - crossWidth;
        top = top + UNIT_VALUE.PX;
        left = left + UNIT_VALUE.PX;
      }
    } else if (argumentSum === 2 || argumentSum == 3) { // 二、 三维
      //  X轴
      if (unitx.unit === UNIT.INNER_STR) {// 内置类型
        if (unitx.value === POSITION.CENTER) {
          left = halfHeight;
        } else if (unitx.value === POSITION.TOP) {
          left = halfWidth;
        } else if (unitx.value === POSITION.RIGHT) {
          left = allWidth;
        } else if (unitx.value === POSITION.BOTTOM) {
          left = halfWidth;
        } else if (unitx.value === POSITION.LEFT) {
          left = -crossWidth;
        }
        left = left + UNIT_VALUE.PX;
      } else if (unitx.unit === UNIT.LENGTH) {
        left = unitx.value - crossWidth;
        left = left + unitx.unitValue;
      } else if (unitx.unit === UNIT.PERCENTAGE) {
        left = width * unitx.value / 100 - crossWidth;
        left = left + UNIT_VALUE.PX;
      }
      //  Y轴
      if (unity.unit === UNIT.INNER_STR) {// 内置类型
        if (unity.value === POSITION.CENTER) {
          top = halfHeight;
        } else if (unity.value === POSITION.TOP) {
          top = -crossHeight;
        } else if (unity.value === POSITION.RIGHT) {
          top = halfHeight;
        } else if (unity.value === POSITION.BOTTOM) {
          top = allHeight;
        } else if (unity.value === POSITION.LEFT) {
          top = halfHeight;
        }
        top = top + UNIT_VALUE.PX;
      } else if (unity.unit === UNIT.LENGTH) {
        top = unity.value - crossHeight;
        top = top + unity.unitValue;
      } else if (unity.unit === UNIT.PERCENTAGE) {
        top = height * unity.value / 100 - crossHeight;
        top = top + UNIT_VALUE.PX;
      }
    }
    // 三维轴描述
    // 不管Z轴偏移量多少，瞄点的位置不会变，Z周垂直与X与Y轴。 但是图形会变。
    return {
      left: 'calc(' + left + ')',
      top: 'calc(' + top + ')',
    }
  }

  // 参数个数变换
  onArgumentChange = argumentSum => this.setState({ argumentSum });

  onUnitXChange = unitx => this.setState({ unitx });
  onUnitYChange = unity => this.setState({ unity });
  onUnitZChange = unitz => this.setState({ unitz });

  // 增加动画效果显示
  onTransformOriginAnimateChange = (checked) => {
    this.setState({ trnasformOriginAnimate: checked })
    // transform-origin 添加显示效果

  }
  getAnimateCls = () => {
    let { argumentSum, trnasformOriginAnimate } = this.state;
    let animation = trnasformOriginAnimate ?
      argumentSum == 3
        ? 'rotate3d 1s forwards '
        : 'rotate 1s forwards'
      : 'none';
    return { animation }
  }


  render() {
    let { argumentSum, unitx, unity, unitz,
      isShowCode, assistStyle } = this.state;
    let { cssCode, styleObj } = this.getCodeStyle();
    // 组合辅助样式的配置样式
    let combStyleObj = { ...this.getAnimateCls(), ...styleObj };
    return (
      <div className="transform-page">
        <div className="show-view">
          {/* 页面配置部分 */}
          <div className="page-config">
            <Button type="dashed" ghost
              onClick={() => this.setState({ isShowCode: !isShowCode })}>
              {isShowCode ? '隐藏' : ' 显示'}CSS代码
            </Button>
          </div>

          {/* 效果显示部分 */}

          <div className="view">
            <div className="example-container"  >
              <div className="example-element" style={combStyleObj} >
                hello APPBIR!!!
              </div>
              <img className="crosshair"
                src="./assert/svg.svg"
                width="24px"
                style={this.getCrossHairStyle()}>
              </img>
              <div className="static-element"></div>
            </div>
          </div>
          {/* 样式代码显示部分 */}
          {
            isShowCode ?
              <pre className="code">
                {cssCode || null}
              </pre>
              : null
          }
        </div>
        {/* 参数配置页面 */}
        <div className="config-panel">
          {/* *******************tansform-origin********************* */}
          <div className="property-item">
            <div className="property-title">
              <div className="title">transform-origin</div>
              <div className="help">
                <Tooltip title={transformOriginTips}>
                  <Icon name="tips"/>
                </Tooltip>
              </div>
              <div className="demo-actions">
                <Switch size="small"
                  checkedChildren="动画"
                  unCheckedChildren="动画"
                  checked={this.state.trnasformOriginAnimate}
                  onChange={this.onTransformOriginAnimateChange} />
              </div>
            </div>
            <div className="property-content">
              <div className="property-condition">
                <Select className="arguments-select" onChange={this.onArgumentChange} value={argumentSum}>
                  {
                    TRANSFORM_AGUMENTS.map((item, index) =>
                      <Option key={index} value={item.value}>{item.name}</Option>)
                  }
                </Select>
              </div>

              {/* 一、二、三、维 */}

              {
                argumentSum != 3 ? argumentSum != 2 ?
                  <div className="property-config">
                    <UnitSelect {...unitx}
                      valueData={INNER_ALL_STR}
                      onChange={this.onUnitXChange} />
                  </div> :
                  <div className="property-config">
                    <UnitSelect {...unitx} valueData={INNER_X_STR} onChange={this.onUnitXChange} />
                    <UnitSelect {...unity} onChange={this.onUnitYChange} />
                  </div> : <div className="property-config">
                    <UnitSelect {...unitx} valueData={INNER_X_STR} onChange={this.onUnitXChange} />
                    <UnitSelect {...unity} onChange={this.onUnitYChange} />
                    <UnitSelect {...unitz} onChange={this.onUnitZChange} />
                  </div>
              }
            </div>
          </div>
          {/* *******************tansform********************* */}
          <div className="property-item">
            <div className="property-title">
              <div className="title">transform</div>
              <div className="help">
                <Tooltip title={transformTips}>
                  {/* <Icon type="question-circle" /> */}
                </Tooltip>
              </div>
              <div className="demo-actions">
                {/* <Switch size="small"
                  checkedChildren="动画"
                  unCheckedChildren="动画"
                  checked={this.state.trnasformOriginAnimate}
                  onChange={this.onTransformOriginAnimateChange} /> */}
              </div>
            </div>
            <div className="property-content">
              <TransformFuntions></TransformFuntions>
            </div>
          </div>
        </div>
      </div >)
  }
}

export default Transform;