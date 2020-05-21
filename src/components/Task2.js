import React, { useState, useRef } from 'react';

const Task2 = (props) => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Create a reference to the input field
  const stringsInput = useRef('');
  
  const handleSubmit = (event) => {
    // Prevent form from submitting
    event.preventDefault();

    const strings = stringsInput.current.value;

    // Check if field not empty
    if (strings !== '') {
      setError('');
    } else {
      setResult('');
      setError('Please provide strings separated by comma.');
      return
    }

    // Split input string into an array
    let query = strings.split(',');
    
    query = query.map(item => {
      // Remove any trailing whitespace
      item = item.trim();

      // Capitalise each item (Could easily do this with CSS but I will use js to do that for demo purpouses)
      return item.charAt(0).toUpperCase() + item.slice(1);
    });

    // Set the result
    setResult(query);
  }

  const clearForm = (event) => {
    // Prevent form from submitting
    event.preventDefault();

    // Initial state
    setResult('');
    setError('');
    stringsInput.current.value = '';
  }

  return (
    <div className="task">
      <p><em>Create an input that takes multiple strings and return them in uppercase.</em></p>

      { result !== '' && 
        <div className="message">
          <p>Your result is:</p>
          <ol>
            {
              result.map((item, key) =>
                <li key={key}>{item}</li>
              )
            }
          </ol>
        </div>
      }

      { error !== '' && 
        <p className="message message--error">{ error }</p>
      }

      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>
            <span className="input__label">Strings</span>
            <input placeholder="Please enter strings" type="text" ref={stringsInput} />
            <span className="input__help">Enter strings separated by comma</span>
          </label>
        </div>

        <div className="button__group">
          <button className="button" type="submit">Submit</button>
          <button  className="button button--secondary" onClick={event => clearForm(event)}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default Task2;