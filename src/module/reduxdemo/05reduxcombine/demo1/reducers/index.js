export default (state = 1, action) => {
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>demo1:reducer',action,state)

  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
