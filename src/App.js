import logo from './logo.svg';
import './App.css';
import Tree from './components/Tree'
import { binaryTree, AVLTree } from './BST'

import { useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <Tree />
    </div>
  );
}

export default App;
