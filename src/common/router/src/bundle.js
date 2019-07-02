import React from 'react';
import ReactDOM from 'react-dom';
import RiilComponent from "./component/index";

function render(props, children, parentDom) {
    ReactDOM.render(React.createElement(
        RiilComponent,
        props,
        children
    ), parentDom);
}

module.exports = { render };