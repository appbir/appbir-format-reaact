/*********************************************************************************
 *                                 工程性配置文件
 **********************************************************************************
 * 1.满足开发、联调、发布等不同阶段的便捷性，提升效率。
 */
export default {
    /** 
     * 是否本地数据交互
     *  true  : 本地交互
     *  false : 远程交互 (默认值)
     */
    isLocalRequest:false,

    /**
     * 是否开启权限检查
     * true   ：开启权限检查(默认值)  
     * false  ：不开启权限检查
     */
    isCheckAuth:true,

    /**
     * URL参数是否编码处理
     *  true  : 编码处理 (默认值)
     *  false ：无编码处理
     * 
     */
    isURLEncoding:true,

    /**
     * 日志级别
     * [LOG_LEVEL ] 日志级别 0:TRACE 1:'DEBUG',2:'INFO',3:'TIME',4:'WARN',8:'ERROR',99:'OFF'
     * @type {string}
     */
    LOG_LEVEL: 'ERROR',

    /**
     * [LOGGER_MODEL 日志打印模式 默认是控制台]
     * ALERT : 表示弹出式打印  false 表示控制台打印
     */
    LOGGER_MODEL: false,
    
    /**
     * [LOG_FRAME ] 框架日志
     * @type {Boolean} true false
     *       其中显示级别跟LOG_LEVEL保持一致
     */
    LOG_FRAME: false,

};
