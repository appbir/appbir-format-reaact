import {default as loggerjs}  from './logger.min';
// TODO 代码规范化后续处理
let LoggerJS = loggerjs;

export const LOG_TYPE = { 
    debug: 'debug', 
    info: 'info', 
    warn: 'warn', 
    error: 'error'
};

const  LOG_TYPE_LEVEL = {
    TRACE:1,
    DEBUG: 2,
    INFO: 3,
    TIME: 4,
    WARN: 5,
    ERROR: 8,
    OFF: 88
}

let isAlert;
let systemLevel;
let isLogFrame;

// 初始化日志
export const   init = (loggerLevel, loggerModel, logFrame) => {
    isAlert = loggerModel;
    systemLevel  = loggerLevel.toUpperCase()
    isLogFrame = logFrame;
    LoggerJS.useDefaults();
    let level = LoggerJS[systemLevel];
    level && LoggerJS.setLevel(level);
    return LoggerJS;
}

export const  debug = (...args) => {
    if(isAlert){
        if(LOG_TYPE_LEVEL[systemLevel] <= LOG_TYPE_LEVEL.DEBUG){
            alertLoggerJS.apply(this,args);
        }
        return ;
    }
    LoggerJS.debug.apply(this, args);
}

export const  info= (...args) =>{
        if(isAlert){
        if(LOG_TYPE_LEVEL[systemLevel] <= LOG_TYPE_LEVEL.INFO){
            alertLoggerJS.apply(this,args);
        }
        return ;
    }
    LoggerJS.info.apply(this,args);
}

export const  warn = (...args)=> {
        if(isAlert){
        if(LOG_TYPE_LEVEL[systemLevel] <= LOG_TYPE_LEVEL.TIME){
            alertLoggerJS.apply(this,args);
        }
        return ;
    }
    LoggerJS.warn.apply(this,args);
}

export const  error = (...args) =>{
        if(isAlert){
        if(LOG_TYPE_LEVEL[systemLevel] <= LOG_TYPE_LEVEL.ERROR){
            alertLoggerJS.apply(this,args);
        }
        return ;
    }
    LoggerJS.error.apply(this, args);
}

let  loggerSupportFuncs = {debug,info,warn,error};

function objToString(s){
    let type = $.type(s);
    if(type ==='error'){
        return s.stack;
    }
    return JSON.stringify(s);
}

function alertLoggerJS() {
    if(alert){
        let result = [];
        for(let i = 0 ; i < arguments.length; i ++ ){
            result.push(objToString(arguments[i]));
        }
        alert(result.join(">"));
    }
}


/**
 * [frame 只打印框架级日志 只支持打印字符串]
 * @param  {[string]} type [debug.info,warn,error]
 * @param  {[string]} message [打印信息]
 *****
 *  frame(message) // 默认debug 消息
 *  frame(type,message) // 类型  消息
 *  frame(messagetemplate,para) // 模版消息
 *  frame(type,messagetemplate,para,para,para,para) // 类型 自定义模版 消息
 */
export const  frame = (type, message,...args) =>{
    if (!console || !type || !isLogFrame) {
        return;
    }
    let para = [];
    let _type = 'debug';
    let formatString = '%cFRAME: %s';
    let formatStyle = 'color:blue';
    if (typeof message === 'undefined') {
        message = type;
    } else {
        if (LOG_TYPE[type]) {
            _type = type;
            if (arguments.length > 2) {
                formatString = '%cFRAME: ' + message;
                message = null;
            }
        } else {
            formatString = '%cFRAME: ' + type;
        }
    }

    para.push(formatString);
    para.push(formatStyle);
    message && para.push(message);
    for (let i = 0; i < args.length; i++) {
        para.push(args[i]);
    }
    _type && loggerSupportFuncs[_type].apply(this, para);
}

