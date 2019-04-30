export default (state = 2, action) => {
  switch (action.type) {
    case 'INCREMENT2':
      return state + 2
    case 'DECREMENT2':
      return state - 2
    default:
      return state
  }
}
