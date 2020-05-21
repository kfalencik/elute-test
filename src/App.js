import React from 'react';
import Task1 from './components/Task1.js';
import Task2 from './components/Task2.js';
import Task3 from './components/Task3.js';
import Task4 from './components/Task4.js';

import API from './components/API.js';
import Puzzle from './components/Puzzle.js';

function App() {
  return (
    <div className="App">
      <main>
        <section className="container">
          <h1>Elute Intelligence Frontend Test</h1>
        </section>

        <section className="container">
          <h2>Task 1.</h2>
          <Task1 />
        </section>

        <section className="container">
          <h2>Task 2.</h2>
          <Task2 />
        </section>

        <section className="container">
          <h2>Task 3.</h2>
          <Task3/>
        </section>

        <section className="container">
          <h2>Task 4.</h2>
          <Task4/>
        </section>

        <section className="container">
          <h2>Task 5.</h2>
          <p><em>Show an exmaple of how to handle invalid inputs</em></p>
          <p><strong>Each of the previous tasks has input validation and shows a descriptive error message if the value is invalid.</strong></p>
        </section>

        <section className="container">
          <h2>API</h2>
          <API />
        </section>

        <section className="container">
          <h2>Puzzle</h2>
          <Puzzle />
        </section>
      </main>
    </div>
  );
}

export default App;
