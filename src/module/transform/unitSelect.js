import React from 'react';
import { Input, Select, InputNumber } from 'antd';
import { UNIT, UNIT_VALUE, UNIT_TYPE, INNER_X_STR, UNIT_PECENT_TYPE, UNIT_LENTH_TYPE, POSITION } from './const'
const InputGroup = Input.Group;
const { Option } = Select;


// 每个单元选择
class UnitSelect extends React.Component {

    constructor(props) {
        super(props);
        let { unit, value, unitValue, valueData, typeData } = this.props;
        this.state = {
            unit: unit || UNIT.PERCENTAGE, // 类型
            value: value,  // 输入值
            unitValue: unitValue, // 单位名称
            // 类型下拉框数据
            typeData: typeData || UNIT_TYPE,
            // 值下拉框数据
            valueData: valueData || INNER_X_STR,
            // 单位下拉框数据
            unitData: UNIT_PECENT_TYPE
        }
    }

    componentWillReceiveProps = (props) => {
        this.setState(props);
    }

    onChange = (changeProps) => {
        let { unit, value, unitValue } = this.state;
        this.setState(changeProps);
        let props = $.extend(true, { unit, value, unitValue }, changeProps);
        let simpleProps = {
            unit: props.unit,
            value: props.value,
            unitValue: props.unitValue,
        };
        this.props.onChange && this.props.onChange(simpleProps, props);
    }

    onTypeChange = (unit) => {
        // 类型变换 单位跟随变换
        let unitData = [];
        let unitValue = this.state.unitValue;
        let value = this.recodeValue;
        if (unit === UNIT.PERCENTAGE) { // 百分比
            unitData = UNIT_PECENT_TYPE;
            unitValue = UNIT_VALUE.PERCENT;
        } else if (unit === UNIT.LENGTH) { // 长度类型
            unitData = UNIT_LENTH_TYPE;
            unitValue = UNIT_VALUE.PX;
        } else if (unit === UNIT.INNER_STR) { // 内置类型
            value = POSITION.CENTER;
            unitValue = '';
            // 记录上一次的数据
            this.recodeValue = this.state.value;
        }
        this.onChange({ unitData, unit, unitValue, value });
    }

    // 单位空间
    onUnitChange = unitValue => {
        this.onChange({ unitValue });
    }

    // 值输入控件
    onInputChange = value => {
        this.onChange({ value });
    }


    render = () => {
        let { unit, value, unitValue } = this.state;

        return <InputGroup className="unit-item" compact {...this.props}>
            {/* 类型选择 */}
            <Select disabled={this.state.typeData.length < 2}
                className="argument-type"
                onChange={this.onTypeChange}
                value={unit}>
                {
                    this.state.typeData.map((item, index) =>
                        <Option key={index} value={item.value}>
                            {item.name}
                        </Option>)
                }
            </Select>
            {/* 输入内容 */}
            {
                unit === UNIT.INNER_STR ?
                    <Select className="input-value"
                        onChange={this.onInputChange}
                        value={value}>
                        {
                            this.state.valueData.map((item, index) =>
                                <Option key={index} value={item.value}>
                                    {item.name}
                                </Option>)
                        }
                    </Select>
                    : <InputNumber  className="input-value"
                        onChange={this.onInputChange}
                        value={value} />
            }
            {/* 单位选择 */}
            {
                this.state.unitData.length ?
                    <Select disabled={this.state.unitData.length < 2}
                        className="unit-choice"
                        onChange={this.onUnitChange}
                        value={unitValue}>
                        {
                            this.state.unitData.map((item, index) =>
                                <Option key={index} value={item.value}>
                                    {item.name}
                                </Option>)
                        }
                    </Select> :
                    <Select className="unit-choice"
                        disabled
                        value={'无'} />

            }
        </InputGroup>
    }
}

export default UnitSelect;