import './icon.less';
import React from 'react';
import PropTypes from 'prop-types';
import './font/iconfont.css';
const SIZE = {
    DEFAULT: 'default', // 默认中等图标
    SMALL: 'small', // 小图标
    LARGE: 'large'  // 大图标
}

class Icon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render = ()=> {
        let {size,name,prefixFontClass,prefixFontFamily} = this.props;
        let {children} = this.props;
        return (
            <div className="app-icon">
                <i className={name}>{children}</i>
            </div >)
    }
}

// 外部导出参数
Icon.SIZE = SIZE;

// 默认值
Icon.defaultProps = {
    size:SIZE.default,
    name:'',
    prefixFontClass:'i-',
    prefixFontFamily:'i-font',
};

// 参数类型
Icon.propTypes = {
    size:PropTypes.string,
    name:PropTypes.string,
    prefixFontClass:PropTypes.string,
    prefixFontFamily:PropTypes.string,
};


export default Icon;