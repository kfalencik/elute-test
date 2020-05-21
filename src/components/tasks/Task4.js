import React, { useState, useRef } from 'react';

const Task2 = (props) => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Create a reference to the input field
  const fileInput = useRef(null);

  const handleSubmit = async (event) => {
    // Prevent form from submitting
    event.preventDefault();

    // Only continue if there is a file selected
    if (fileInput.current.files.length) {
      setResult('');

      // Get file
      const file = fileInput.current.files[0];

      // Only continue if the uploaded file is a .txt
      if (file.type === 'text/plain') {
        setError('');

        // New file reader
        const reader = new FileReader();
        
        // On file load set the result to the file contents
        reader.onload = async (event) => { 
          setResult(event.target.result);
        };
        
        // Read file
        reader.readAsText(file);
      } else {
        setResult('');
        setError('The file must be in a .txt file format. Please try again.');
      }
    } else {
      setResult('');
      setError('Please upload a text file.');
    }
  }

  const clearForm = (event) => {
    // Prevent form from submitting
    event.preventDefault();

    // Initial state
    setResult('');
    setError('');
    fileInput.current.value = null;
  }

  return (
    <div className="task">
      <p><em>Read a file and show the contents.</em></p>

      { result !== '' && 
        <div className="message">
          <p>File contents:</p>
          <p>{result}</p>
        </div>
      }

      { error !== '' && 
        <p className="message message--error">{ error }</p>
      }

      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>
            <span className="input__label">File</span>
            <input type="file" accept="txt" ref={fileInput} /> 
            <span className="input__help">Please upload a text file</span>
          </label>
        </div>

        <div className="button__group">
          <button className="button" type="submit">Submit</button>
          <button className="button button--secondary" onClick={event => clearForm(event)}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default Task2;