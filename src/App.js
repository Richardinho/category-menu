import React from 'react';
import logo from './logo.svg';
import MyMenu from './menu';
import { Provider } from 'react-redux'
import { createStore } from 'redux';

import './App.css';

const initialState = {
  blah: 'Hello i love you wont you tell me your name?',
  categories: [
    { id: 'delta',  parent: 'beta',    name: 'this is delta'   },
    { id: 'alpha',  parent: '',        name: 'this is alpha'   },
    { id: 'beta',   parent: '',        name: 'this is beta'    },
    { id: 'zeta',   parent: 'epsilon', name: 'this is zeta'    },
    { id: 'gamma',  parent: 'beta',    name: 'this is gamma'   },
    { id: 'epsilon',parent: 'beta',    name: 'this is epsilon' },
  ]
};

function getNewId(seed) {
  return Math.random() + seed;
}

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'DELETE_CATEGORY_ACTION':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.id)
      }
    case 'ADD_CHILD_ACTION':
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            id: getNewId(action.parentId),
            parent: action.parentId,
            name: 'blah blah',
          },
        ]};
  }

  return state;
};

const store = createStore(rootReducer); 

function App() {
  return (
    <Provider store={store}>
      <h2>Category Menu</h2>
      <MyMenu/>
    </Provider>
  );
}

export default App;
