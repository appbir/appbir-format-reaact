/**
 * 数据交互
 */
import 'whatwg-fetch';

import {errorFilter, showNetWorkError, filterError} from 'riil-error';

const METHOD = {POST: 'POST', PUT: 'PUT', DELETE: 'DELETE', GET: 'GET', REQUEST: 'REQUEST'};

let class2type = {}, toString = class2type.toString;

"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").map(function (name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
});

// 判断数据类型
const toType = obj => {
    if (obj == null) return obj + "";
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
        typeof obj;
}

// 是否为本地交互
let isLocalRequest = () => {
    return store && store.getState && store.getState().getIn(['system', 'config']).isLocalRequest;
};

// 匹配本地路径
let formatLocalUrl = (url, type) => {
    if (!url) return url;
    let pathName = (window.location.pathname).replace('/index.html', '/');
    return pathName + 'local/' + url.replace(/\?/, '/') + '/' + type.toLowerCase() + '.json';
};

// query 参数处理
let addQuery = (url, query) => {
    url && (url = 'api/' + url);
    // 不处理字符串情况
    if (!query || toType(query) === 'string') return url;
    // TODO 细化处理

    // 去掉字符串情况
    // if(toType(query)==='string') return url+'/'+query;

    if (toType(query) === 'array') return url + '?' + query.join(',');
    if (toType(query) === 'object') {
        let q = [];
        for (let key in query) {
            q.push(key + '=' + query[key]);
        }
        return url += '?' + q.join('&');
    }
}

// 远程代理
let formatURL = (url, query, option) =>
    option.isLocal ?
        formatLocalUrl(addQuery(url, query), option.method)
        : addQuery(url, query);

const loading = (key, isShow) => {
    key && window.store.dispatch({type: key, param: isShow});
}
/**
 * 获取header的参数
 * @param option
 */
const getHeaderParams = (option, headers) => {
    //获取传递得header参数
    try {
        if (option && option.header) {
            let header = option.header;
            let names = Object.keys(header);
            if (names && names.length > 0) {
                names.forEach(key => {
                    if (key === 'contentType') {
                        //如果设置了参数类型，单独处理
                        headers.set('Content-Type', header[key]);
                    } else {
                        if (headers.has(key)) {
                            //覆盖参数
                            headers.set(key, header[key]);
                        } else {
                            //追加参数
                            headers.append(key, header[key]);
                        }
                    }

                });
                //删除无用属性
                delete option.header;
            }
        }
    } catch (e) {
        console.error(e);
        return null;
    }
};


/**
 * 数据交互
 * @param {*} url 
 * @param {*} body 
 * @param {*} option ，如需添加header参数，形式为option={header:{xxx}}
 */
let dealFetch = (url, body, option = {}) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let isLocal = option.isLocal;
    //格式化传递的header参数
    getHeaderParams(option, headers);
    let options = {
        headers: headers,
        ...option,
        method: isLocal ? METHOD.GET : option.method,
        credentials: 'include',
    };
    if(body && !isLocal){
        //区别于application/x-www-form-urlencoded
        options.body = (headers.get('Content-Type')=== 'application/json'?JSON.stringify(body):body);
    }
    // 加载动画
    loading(option.loading, true);

    const errorCb = (err)=>{
        options.errorCallback && options.errorCallback(err)
    }

    return new Promise(function (resolve, reject) {
        let statusCode;
        let resp;
        fetch(url, options)
        //强制文本解析  处理无返回数据json格式解析报错无法捕获错误情况 流需单独处理
            .then(response => {
                resp = response
                if (response.status !== 200) {
                    statusCode = response.status;
                }
                let res = response.text();
                return res;
            }).then(result => {
            loading(option.loading, false);

            if (result) {
                try {
                    result = JSON.parse(result)
                } catch (e) {/*console.log('参数传递非JSON格式！')*/
                }
            }

            // 非正常情况
            if (statusCode) {
                errorCb(result);
                // 指定的错误码不处理
                if (options.unErrorCode && options.unErrorCode === statusCode) {
                    // 数据格式化
                    let data = options.isFormat === false ? result : result && result.data;
                    // 错误自行处理 resove只能支持一个参数传递
                    let res = (options.error || options.validateError || options.unErrorCode) ? {
                        result: data,
                        response: resp
                    } : data;
                    return resolve(res)
                }
                // 全部错误自行处理
                if (!options.error) {
                    if (options.validateError) {
                        if (statusCode !== 210) {
                            return filterError(statusCode, result);
                        }
                    } else {
                        return filterError(statusCode, result);
                    }
                }
            }

            // 数据格式化
            let data = options.isFormat === false ? result : result && result.data;
            // 错误自行处理 resove只能支持一个参数传递
            let res = (options.error || options.validateError) ? {result: data, response: resp} : data;
            resolve(res)
        })
            .catch(err => {
                    errorCb(err);
                    // 网络异常处理
                    showNetWorkError();
                    reject(err)
                }
            );
    });
};

//timeout function
function timeoutPromise(promise, timeout) {
    var timeoutPromise = new Promise(function (resolve, reject) {
        setTimeout(() => {
            reject(new Error("fetch timeout"))
        }, timeout);
    });
    return Promise.race([promise, timeoutPromise]);
}


// TODO 详细处理
let dealError = (url, body, option) => new Promise(
    (resolve, reject) => {
        reject('URL参数必须输入！');
    }
);

/**
 *  // 前后端数据交互
 * @param {*} url     URL地址
 * @param {*} body    body体参数
 * @param {*} query   url参数 简化开发url地址拼装
 * @param {*} option  其他数据交互参数
 * {
 * 	  isLocal : boolean   是否本地交互
 *    method：string      数据交互方式
 *    header：object      数据交互头部信息
 * 	  error:boolean,      默认数据义务错误码处理 false , true表示自行处理
 * 	  loading:const       动画加载处理key值 目前不支持批量 后续支持
 *    errorCallback:function 失败的回调函数(不会受到异常处理的印象)
 * }
 */
let request = (url, body, query, option) => {
    option = option ? option : {};
    let method = option.method || METHOD.GET;
    option.method = method.toUpperCase();
    // loading处理
    if (toType(body) === 'string') {
        option.loading = body;
    }
    if (toType(query) === 'string') {
        option.loading = query;
    }

    url = formatURL(url, query, option);
    // 不支持方法或者异常处理
    if (!url) return dealError(url, body, option);
    // 正常数据交互
    return dealFetch(url, body, option);
    //return timeoutPromise(dealFetch(url,body,option),10000);
};
const addMethod = (option, method, isLocal, isFormat) => {
    option = option || {};
    method && (option.method = method);
    // 传递参数优先原则
    if (typeof isLocal == 'undefined') {
        option.isLocal = toType(option.isLocal) === "boolean" ? option.isLocal : isLocalRequest();
    } else {
        option.isLocal = !!isLocal;
    }

    (typeof isFormat !== 'undefined') && (option.isFormat = isFormat);
    return option;
}

// 便捷接口
const get = (url, query, option) => request(url, null, query, addMethod(option, METHOD.GET,undefined,false))
const getLocal = (url, query, option) => request(url, null, query, addMethod(option, METHOD.GET, true));
const post = (url, body, query, option) => request(url, body, query, addMethod(option, METHOD.POST))
const postLocal = (url, body, query, option) => request(url, body, query, addMethod(option, METHOD.POST, true))
const put = (url, body, query, option) => request(url, body, query, addMethod(option, METHOD.PUT))
const putLocal = (url, body, query, option) => request(url, body, query, addMethod(option, METHOD.PUT, true))
const requestLocal = (url, body, query, option) => request(url, body, query, addMethod(option, false, true))
const del = (url, body, query, option) => request(url, body, query, addMethod(option, METHOD.DELETE))
const delLocal = (url, body, query, option) => request(url, body, query, addMethod(option, METHOD.DELETE, true))
// post 接口 
const req = (url, body, query, option) => request(url, body, query, addMethod(option, METHOD.POST, undefined, false))
const reqLocal = (url, body, query, option) => request(url, body, query, addMethod(option, METHOD.POST, true, false))
export {
    get,
    getLocal,
    post,
    postLocal,
    put,
    putLocal,
    del,
    delLocal,
    request,
    requestLocal,
    req,
    reqLocal
};