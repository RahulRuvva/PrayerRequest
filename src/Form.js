import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { useUser } from './UserContext'; // Import your user context

const YourFormComponent = () => {
  const { email, name } = useUser(); // Access user information from the user context
  const [prayerPoint, setPrayerPoint] = useState('');
  const [prayerFor, setPrayerFor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');


  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: 'PrayerForm',
    user: name, // Use the user name from the user context
    email, // Use the user email from the user context
    date: '',
    time: '',
    prayerPoint: '',
    prayerFor: '',
    category: '',
  });

  useEffect(() => {
    // Update form data when any of the input fields change
    setFormData({
      ...formData,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      prayerPoint,
      prayerFor,
      category: selectedCategory,
    });
  }, [prayerPoint, prayerFor, selectedCategory, name, email]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'outlined-basic') {
      setPrayerPoint(value);
    } else if (id === 'filled-basic') {
      setPrayerFor(value);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = () => {
    // Assuming you have a function to send data to the database
    sendDataToDatabase(formData);

    // Optionally, you can reset the form after submission
    setPrayerPoint('');
    setPrayerFor('');
    setSelectedCategory('');
  };

  return (
    <form>

      <TextField
        id="outlined-basic"
        label="Prayer Point"
        variant="outlined"
        value={prayerPoint}
        onChange={handleInputChange}
      />

      <TextField
        id="filled-basic"
        label="Prayer For"
        variant="outlined"
        value={prayerFor}
        onChange={handleInputChange}
      />

      <FormControl variant="outlined">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="addiction">Addiction</MenuItem>
          <MenuItem value="health">Health</MenuItem>
          <MenuItem value="accident">Accident</MenuItem>
          <MenuItem value="exam">Exam</MenuItem>
          <MenuItem value="general">General</MenuItem>
        </Select>
      </FormControl>
      
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

// Assuming you have a function to send data to the database
const sendDataToDatabase = (formData) => {
  // Implement the logic to send data to the database (e.g., using an API call)
  console.log('Sending data to the database:', formData);
};

export default YourFormComponent;
