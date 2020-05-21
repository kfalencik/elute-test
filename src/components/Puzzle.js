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

    // Only allow single digits and commas
    const regex = /^[0-9](,[0-9])+$/;
    if (regex.test(query)) {
      setError('');
    } else {
      setResult('');
      setError('Please provide a sequence of digits separated by comma.');
      return;
    }

    // Split input string into an array
    query = query.split(',');

    // Clone query so we don't overrite it during checks
    let newQuery = [...query];

    // Keep track of previous digit and number of found consequetive number instances
    let previousDigit = null;
    let found = 1;

    query.forEach((digit, index) => { 
      // See if current digit matches the last one
      if (digit === previousDigit) {
        // Put 'Snap' in the correct place of the cloned array
        newQuery.splice(index + found, 0, 'Snap');
        found++;
      }

      // Keep track of the previous Digit for the next loop
      previousDigit = digit;
    });

    // Turn array back to string with reversed values
    query = newQuery.join(', ');

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
      <p><em>Create something that accepts a sequence of digits and looks for 2 consequetive numbers. When found write 'Snap', else print out the number (e.g. 1, 3, 5, 5, 'Snap').</em></p>

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
            <span className="input__help">Enter digits separated by comma</span>
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