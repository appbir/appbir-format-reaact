export default (state = {value:10,propsValue:10}, action) => {
  switch (action.type) {
    case 'INCREMENT_RIGHT':
      return state.setIn(['value'],state.getIn(['value']) + 1 )
    case 'DECREMENT_RIGHT':
      return state.setIn(['value'],state.getIn(['value']) - 1 )
    case 'REFRESH_RIGHT':
      return state.setIn(['propsValue'], action.param )
    default:
      return state
  }
}

