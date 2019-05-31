import * as logger from './logger.js';

logger.init('TRACE',false,true);
export const Logger = logger;


export const init = ()=>{
    
}

export { connect as connect } from './index';
