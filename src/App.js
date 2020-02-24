import React from 'react';
import './App.css';
import Book from './book/book'

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <h1>Find a book!</h1>
        <Book></Book>
      </div>
    </div>
  );
}

export default App;
