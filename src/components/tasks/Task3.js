import React, { useState, useRef } from 'react';

const Task2 = (props) => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Create a reference to the input field
  const sentenceInput = useRef('');
  
  const handleSubmit = (event) => {
    // Prevent form from submitting
    event.preventDefault();

    const sentence = sentenceInput.current.value;

    // Check if field not empty
    if (sentence !== '') {
      setError('');
    } else {
      setResult('');
      setError('Please provide a sentence.');
      return
    }

    // Split input string into an array
    let query = sentence.split(' ');

    console.log(query);
    
    query = query.map(item => {
      // Remove any trailing whitespace
      item = item.trim();

      // Remove any special characters
      return item.replace(/[^a-zA-Z ]/g, '');
    });

    // Use set to only keep unique values in the array
    query = [...new Set(query)];

    // Set the result
    setResult(query);
  }

  const clearForm = (event) => {
    // Prevent form from submitting
    event.preventDefault();

    // Initial state
    setResult('');
    setError('');
    sentenceInput.current.value = '';
  }

  const wordOccurrence = (word) => {
    return sentenceInput.current.value.split(word).length - 1;
  }

  return (
    <div className="task">
      <p><em>Given an input sentence, return the number of unique words (eg. "the cat jumped over the mat" => the->2, cat->1).</em></p>

      { result !== '' && 
        <div className="message">
          <p>Your result is:</p>
          <ol>
            {
              result.map((item, key) =>
                <li key={key}>{item} -> {wordOccurrence(item)} </li>
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
            <span className="input__label">Sentence</span>
            <input placeholder="Please enter sentence" type="text" ref={sentenceInput} />
            <span className="input__help">Enter a sentence</span>
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