export default (state = 3, action) => {
  switch (action.type) {
    case 'INCREMENT3':
      return state + 3
    case 'DECREMENT3':
      return state - 3
    default:
      return state
  }
}
