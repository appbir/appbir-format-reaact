/*********************************************************************************
 *                                 系统字典表配置文件
 **********************************************************************************
 * 1. 前端存储少数据交互
 * 2. 统一转换降低代码量、提升开发效率
 * 3. 后端为准时系统初始化的合适时机进行格式化
 */

export const DICT = {
    // 告警时间
    ALARM_TIME:[
        {key:'0',value:'全部时间',name:'ALL_TIME'},
        {key:'1',value:'最近4小时',name:'LAST_FOUR_HOUR'},
        {key:'2',value:'最近1天',name:'LAST_ONE_DAY'},
        {key:'3',value:'最近7天',name:'LAST_SEVEN_DAY'},
        {key:'4',value:'自定义时间',name:'CUSTOM_TIME'},
    ]
}

export const transform= (dict,key,name) =>{
    let res = {};
    dict.slice().map(item=>{
        res[item[key]] = item[name];
    })
    return res;
}


// 字典转换为对象
export const transformNameKeyObject= dict => transform(dict,'name','key');

// 字典转换对象
var _DICT_NAME_KEY = {};
for(let dictName in DICT){
    _DICT_NAME_KEY[dictName] = transformNameKeyObject(DICT[dictName])
}

var _DICT_KEY_NAME = {};
for(let dictName in DICT){
    _DICT_KEY_NAME[dictName] = transform(DICT[dictName],'key','name')
}

export let DICT_KEY_NAME = _DICT_KEY_NAME;

export let DICT_NAME_KEY = _DICT_NAME_KEY;



