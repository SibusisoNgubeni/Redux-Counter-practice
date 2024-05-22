/**
 * Initial state of the counter
 * @typedef {object} initialState
 * @property {0} count 
 */

const initialState = {
    count: 0,
  };
  
  
  /**
   * Action Types
   * @typedef {string} ADD
   * @typedef {string} SUBTRACT
   * @typedef {string} RESET
   * 
   */

  const ADD = 'ADD';
  const SUBTRACT = 'SUBTRACT';
  const RESET = 'RESET';
  
  /**
   * Reducer Function
   * 
   */
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case ADD:
        return { count: state.count + 1 };
      case SUBTRACT:
        return { count: state.count - 1 };
      case RESET:
        return { count: 0 };
      default:
        return state;
    }
  }
  
  // Redux-Inspired Store
  function createStore(reducer) {
    let state;
    let listeners = [];
  
    // Get the current state
    const getState = () => state;
  
    // Dispatch an action
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    };
  
    // Subscribe to state changes
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    };
  
    // Initialize the state
    dispatch({});
  
    return {
      getState,
      dispatch,
      subscribe,
    };
  }
  
  // Create the store
  const store = createStore(reducer);
  
  // Subscribe to state changes and log to console
  store.subscribe(() => {
    console.log('Current State:', store.getState());
  });
  
  // User Stories
  
  // Scenario 1: Initial State Verification
  console.log('Scenario 1: Initial State Verification');
  console.log(store.getState()); // { count: 0 }
  
  // Scenario 2: Incrementing the Counter
  console.log('Scenario 2: Incrementing the Counter');
  store.dispatch({ type: ADD });
  store.dispatch({ type: ADD });
  
  // Scenario 3: Decrementing the Counter
  console.log('Scenario 3: Decrementing the Counter');
  store.dispatch({ type: SUBTRACT });
  
  // Scenario 4: Resetting the Counter
  console.log('Scenario 4: Resetting the Counter');
  store.dispatch({ type: RESET });
  