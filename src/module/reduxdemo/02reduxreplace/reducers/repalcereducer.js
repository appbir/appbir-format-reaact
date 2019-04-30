export default (state = 100, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 2
    case 'DECREMENT':
      return state - 2
    default:
      return state
  }
}
