import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.incrementAsync = this.incrementAsync.bind(this);
    this.incrementIfOdd = this.incrementIfOdd.bind(this);
  }

  incrementIfOdd() {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement &&  this.props.onIncrement()
    }
  }

  incrementAsync() {
    setTimeout(this.props.onIncrement, 1000)
  }

  render() {
    const { value,propsValue, onIncrement, onDecrement,refreshOtherComponentValue} = this.props
    return (
      <p>
        
        ReceiveValue: {propsValue} 
        {' '}
        <br/>
        Clicked: {value} times
        {' '}
        <button onClick={onIncrement && onIncrement.bind(this,'onIncrement')}>
          +
        </button>
        {' '}
        <button onClick={onDecrement}>
          -
        </button>
        <button onClick={refreshOtherComponentValue}>
            refreshOtherComponentValue
        </button>
      </p>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func
}

export default Counter
