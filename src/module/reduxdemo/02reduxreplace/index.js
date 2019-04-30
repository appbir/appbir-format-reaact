import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/Counter'
import counter from './reducers'
import repalcereducer from './reducers/repalcereducer'

const store = createStore(counter)

console.log(store);
// 替换reduce
debugger;
store.replaceReducer(repalcereducer);
console.log(store);

const rootEl = document.getElementById('root')

// 动态添加state

window.store = store;

const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  rootEl
)

render()
store.subscribe(render)
