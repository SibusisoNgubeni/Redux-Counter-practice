/** 
 * Initial state of the counter 
 * @typedef {object} initialState 
 * @property {number} count 
 */

const initialState = { count: 0 };

/** 
 * for action
 * @typedef {object} action 
 * @property {string} type 
 */

/** 
 * action types 
 * @typedef {'ADD' | 'SUBTRACT' | 'RESET'} ActionType 
 */

const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const RESET = 'RESET';


const reducers = {
[ADD]: (state) => ({ count: state.count + 1 }),
[SUBTRACT]: (state) => ({ count: state.count - 1 }),
[RESET]: (state) => ({ count: 0 }),
};

const defaultReducer = (state) => state;

function reducer(state = initialState, action) {
const reduceFn = reducers[action.type] || defaultReducer;
return reduceFn(state);
}


function createStore(reducer) {
let state;
let listeners = [];

// Get the current state
const getState = () => state;


const dispatch = (action) => {
state = reducer(state, action);
listeners.forEach((listener) => listener());
};


const subscribe = (listener) => {
listeners.push(listener);
return () => {
listeners = listeners.filter((l) => l !== listener);
};
};

// Initialize the state
dispatch({});

return { getState, dispatch, subscribe };
}


const store = createStore(reducer);

store.subscribe(() => {
console.log('Current State:', store.getState());
});


console.log('Scenario 1: Initial State =');
console.log(store.getState()); 


console.log('Scenario 2: Counter incremented');
store.dispatch({ type: ADD });
store.dispatch({ type: ADD });


console.log('Scenario 3: Counter decremented');
store.dispatch({ type: SUBTRACT });


console.log('Scenario 4: Resetting the Counter');
store.dispatch({ type:RESET});
