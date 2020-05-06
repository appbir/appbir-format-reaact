import './icon.less';
import React from 'react';
import PropTypes from 'prop-types';
import './font/iconfont.css';

const SIZE = {
    DEFAULT: 'default', // 默认中等图标
    SMALL: 'small', // 小图标
    LARGE: 'large'  // 大图标
};

class Icon extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        let { size, name, prefixFontClass, className, prefixFontFamily, children, ...props } = this.props;
        let iconCls = [prefixFontFamily, prefixFontClass + name, size ? 'icon-' + size : '', className].join(' ');
        return (
            <div className="app-icon" {...props}>
                <i className={iconCls}>{children}</i>
            </div >)
    }
}

// 外部导出参数
Icon.SIZE = SIZE;

// 默认值
Icon.defaultProps = {
    size: '',
    name: '',
    prefixFontClass: 'i-',
    prefixFontFamily: 'i-font',
    /**
     * prefixFontClass 、prefixFontFamily 对应iconfont的设置项目
     *  https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=1799281
     */
};

// 参数类型
Icon.propTypes = {
    size: PropTypes.string,
    name: PropTypes.string,
    prefixFontClass: PropTypes.string,
    prefixFontFamily: PropTypes.string,
};


export default Icon;