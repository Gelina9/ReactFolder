import React from 'react';
import {Provider} from 'react-redux'
import store from './store'
import PostForm from './components/PostForm'
import Posts from './components/Posts'
import './App.css';

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <PostForm/>
        <Posts/>
      </div>
    </Provider>
  );
}

export default App;
