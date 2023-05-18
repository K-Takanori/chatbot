import { createStore, combineReducers } from 'redux';

const initialState = {
    count: 50,
    posts: [
      { id: 1, title: "Reduxについて" },
      {
        id: 2,
        title: "ReduxのHooksについて",
      },
    ],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREASE_COUNT':
        return {
          count: state.count + 1,
        };
      case 'DECREASE_COUNT':
        return {
          count: state.count - 1,
        };
      default:
        return state;
    }
};
  
const store = createStore(reducer);
console.log(store.getState());

export default store;