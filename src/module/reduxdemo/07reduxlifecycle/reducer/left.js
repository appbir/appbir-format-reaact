export default (state = {value:100}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state.setIn(['value'],state.getIn(['value']) + 1 )
    case 'DECREMENT':
      return state.setIn(['value'],state.getIn(['value']) - 1 )
    case 'REFRESH':
      return state.setIn(['value'],action.param)
    default:
      return state
  }
}
