var class2type = {};

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var isPlainObject =  obj =>{
    var proto, Ctor;
    if ( !obj || toString.call( obj ) !== "[object Object]" ) {
        return false;
    }
    proto = Object.getPrototypeOf( obj );
    if ( !proto ) {
        return true;
    }
    Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
    return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
};

const isEmptyObject =  obj => {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
};

/**
 * 数组直接替换处理
 * 不存在状态包含数组时，不做任何处理 返回false
 * 存在数组时，返回 
 * {
 *  keys = [[a,a1,a2],[b],[c]]
 *  values = [value,value,value],
 * }
 * @param {*} totalArray 
 * 
 */
const  totalArray= (stateData,keys=[])=>{
    if(!isPlainObject(stateData) && isEmptyObject(stateData)) return false;
    let res  = {key:[],value:[]};
    let flag = false;
    for(var key in stateData){
        let value =stateData[key];
        if(Array.isArray(value)){
            flag = true;
            let _keys = keys.slice();
            _keys.push(key);
            res.key.push(_keys);
            res.value.push(value);
        }
        if(isPlainObject(value) && !isEmptyObject(value)){
            let _keys = keys.slice();
            _keys.push(key);
            let result = totalArray(value,_keys);
            if(result){
                flag = true;
                res.key = res.key.concat(result.key);
                res.value = res.value.concat(result.value);
            }
        }   
    }
    return flag && res; 
}

const mergeDeepWithOutArray=(state,param)=>{
    let includeArray = totalArray(param);
    let newState = state.mergeDeep(param);
    if(!includeArray) return newState;
    includeArray.key.map((key,index)=> newState = newState.setIn(key,includeArray.value[index]));
    return newState;
}

export const  merge = mergeDeepWithOutArray;