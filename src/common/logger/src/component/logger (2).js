// 日志组件
define('logger', ['js-logger', 'system.config', 'module.config', 'jquery'], function(Logger, System, moduleSystem, $) {

    var systemConfig = $.extend(true, System, moduleSystem);
    var systemLevel = systemConfig.LOG_LEVEL;
    systemLevel && (systemLevel = systemLevel.toUpperCase());
    var CONS = {
        DEBUG: 1,
        INFO: 2,
        TIME: 3,
        WARN: 4,
        ERROR: 8,
        OFF: 88
    }
    var isAlert = systemConfig.LOGGER_MODEL;

    // 初始化日志
    function init() {
        // frame('init logger...');
        Logger.useDefaults();
        // 设置系统配置日志级别
        var level = Logger[systemLevel];
        level && Logger.setLevel(level);
    }

    function debug() {
        if(isAlert){
            if(CONS[systemLevel] <= CONS.DEBUG){
                alertLogger.apply(this,arguments);
            }
            return ;
        }
        Logger.debug.apply(this, arguments);
    }

    function info() {
         if(isAlert){
            if(CONS[systemLevel] <= CONS.INFO){
                alertLogger.apply(this,arguments);
            }
            return ;
        }
        Logger.info.apply(this, arguments);
    }

    function warn() {
         if(isAlert){
            if(CONS[systemLevel] <= CONS.TIME){
                alertLogger.apply(this,arguments);
            }
            return ;
        }
        Logger.warn.apply(this, arguments);
    }

    function error() {
         if(isAlert){
            if(CONS[systemLevel] <= CONS.ERROR){
                alertLogger.apply(this,arguments);
            }
            return ;
        }
        Logger.error.apply(this, arguments);
    }

    // TODO 有时间细化处理  目前比较粗
    function objToString(s){
       
        var type = $.type(s);
        if(type ==='error'){
            return s.stack;
        }
        return JSON.stringify(s);
    }

    function alertLogger() {
        if(alert){
            var result = [];
            for(var i = 0 ; i < arguments.length; i ++ ){
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
    function frame(type, message) {
        if (!console || !type || !Frame.System.LOG_FRAME) {
            return;
        }
        var supportType = { debug: 'debug', info: 'info', warn: 'warn', error: 'error' };
        var para = [];
        var _type = 'debug';
        var formatString = '%cFRAME: %s';
        var formatStyle = 'color:blue';
        if (typeof message === 'undefined') {
            message = type;
        } else {
            if (supportType[type]) {
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
        for (var i = 2; i < arguments.length; i++) {
            para.push(arguments[i]);
        }
        this[_type] && this[_type].apply(this, para);
    }

    var logger = {
        frame: frame,
        debug: debug,
        info: info,
        warn: warn,
        error: error,
        init: init
    };

    return logger;
});
