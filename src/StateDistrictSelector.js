import React, { useState } from 'react';

const StateDistrictSelector = () => {
  // Define the states and corresponding districts
  const states = ['AP', 'Telangana', 'TamilNadu', 'Kerala'];
  const districts = [
    ['Hyderabad', 'Rangareddy', 'Khammam', 'Warangal', 'Nalgonda'],
    ['Madurai', 'Chennai', 'Kovalam'],
    ['Tuticorin', 'Trichy', 'Tiruchunapally'],
    ['District1', 'District2', 'District3'], // Add districts for Kerala
  ];

  // State to track the selected state
  const [selectedState, setSelectedState] = useState('AP');
  const [input, setInput] = useState('');

  // State to hold the list of entered values
  const [inputList, setInputList] = useState([]);


    // Event handler to update the state when the input changes
    const handleInputChange = (e) => {
      setInput(e.target.value);
    };

      // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the user input, for example, log it to the console

    // Add the current input value to the array
    setInputList([...inputList, input]);
    // Clear the input field after submission
    setInput('');
    console.log('User Input:', input);
  };

  

  return (
    <div>

      <div>
        <h1>THank You JESUS</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Enter Something
          <input 
            type='text'
            value = {input}
            onChange={handleInputChange} 
          />
          </label>
          <button type="submit">Submit</button>
          <h1>{input}</h1>
      </form>
      {/*Display the list of entered values*/}
      <ul>
        {inputList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      </div>
      {/* State selection dropdown */}
      <label>Select a State:</label>
      <select
        onChange={(e) => setSelectedState(e.target.value)}
        value={selectedState}
      >
        <option value="">Select State</option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* Display districts based on selected state */}
      {selectedState && (
        <div>
          <label>Districts in {selectedState}:</label>
          <ul>
            {districts[states.indexOf(selectedState)].map((district, index) => (
              <li key={index}>{district}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StateDistrictSelector;
