import logo from './logo.svg';
import './App.css';
import Tree from './components/Tree'
import { binaryTree, AVLTree } from './BST'

import { useEffect } from 'react';

import ReactGA from "react-ga4";

if (!window.location.href.includes("localhost")) {
  ReactGA.initialize("G-0X9C7QGH9F");
  ReactGA.send("pageview");
}

function App() {
  return (
    <div className="App">
      <Tree />
    </div>
  );
}

export default App;
