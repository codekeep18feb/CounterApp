// Example component
import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../redux/counter/counter-action';

const CounterScree = ({ count, increment, decrement }) => {
  console.log('what is this count here',count)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("stater",state.counter.count)
  return {
  
    count: state.counter.count, // Assuming you have a reducer that manages a "count" property
  }
};

export default connect(mapStateToProps, { increment, decrement })(CounterScree);