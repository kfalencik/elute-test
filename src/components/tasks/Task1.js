import React, { useState, useRef } from 'react';

const Task1 = (props) => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Create a reference to the input field
  const numbersInput = useRef('');
  
  const handleSubmit = (event) => {
    // Prevent form from submitting
    event.preventDefault();

    // Remove all spaces from numbers
    let query = numbersInput.current.value.replace(/\s/g, '');

    // Trim any trailing commas
    query = query.replace(/(^[,\s]+)|([,\s]+$)/g, '');

    // Only allow numbers and commas
    const regex = /^[0-9.,]+$/;
    if (regex.test(query)) {
      setError('');
    } else {
      setResult('');
      setError('Please provide a sequence of numbers separated by comma.');
      return
    }

    // Split input string into an array
    query = query.split(',');

    // Reverse the array
    query.reverse();

    // Turn array back to string with reversed values
    query = query.join(', ');

    // Set the result
    setResult(query);
  }

  const clearForm = (event) => {
    // Prevent form from submitting
    event.preventDefault();

    // Initial state
    setResult('');
    setError('');
    numbersInput.current.value = null;
  }

  return (
    <div className="task">
      <p><em>Create an input that accepts a a sequence of numbers and returns the input reversed  (eg. Input 1, 2, 3 would return 3, 2, 1).</em></p>

      { result !== '' && 
        <p className="message">Your result is { result }</p>
      }

      { error !== '' && 
        <p className="message message--error">{ error }</p>
      }

      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>
            <span className="input__label">Sequence</span>
            <input placeholder="Please enter a sequence" type="text" ref={numbersInput} />
            <span className="input__help">Enter numbers separated by comma</span>
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

export default Task1;