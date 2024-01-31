// Dashboard.js
import { Button, Dialog, DialogTitle, DialogContent, TextField, List, ListItem, ListItemText } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {db} from './firebase';
import {getDocs, addDoc, collection, where, query} from 'firebase/firestore'
import './App.css';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom'; 
import { useUser } from './UserContext';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const PrayerRequestForm = ({ open, onClose, onFormSubmit }) => {
  const [prayerPoint, setPrayerPoint] = useState('');

  //Select the category of prayer
  const [addiction, setAddiction] = useState('');
  const [health, setHealth] = useState(''); 
  const [accident, setAccident] = useState('');
  const [exam, setExam] = useState('');
  const [general, setGeneral] = useState('');
  
  



  const { email } = useUser();
  const { name} = useUser();

  console.log('Email in Dashboard component:', email);
  
  
  const dbref = collection(db, "prayerRequests");

  const handlePrayerPointChange = (event) => {
    setPrayerPoint(event.target.value);
  };

  const handleFormSubmit = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
     
  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

  const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;


  const newPrayerRequest = { id: uuidv4(), 
  name: name, point: prayerPoint, date: formattedDate,  time: formattedTime  };


    // Call onFormSubmit with the new prayer point
    onFormSubmit(newPrayerRequest);
    addDoc(dbref, {PrayerRequests: newPrayerRequest})
    // Close the form
    onClose();
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Prayer Request Form</DialogTitle>
      <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Prayer Point" variant="outlined"  value={prayerPoint}  onChange={handlePrayerPointChange}/>
      <TextField id="filled-basic" label="Prayer For" variant="outlined" value = {prayerFor} onChange={handlerPrayerForChange} />
      
    </Box>

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>  

      <DialogContent>
        <TextField
          label="Prayer Point"
          fullWidth
          value={prayerPoint}
          onChange={handlePrayerPointChange}
        />
        <Button onClick={handleFormSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
};


const Dashboard = () => {

  const [isFormOpen, setFormOpen] = useState(false);
  const [isViewingRequests, setViewingRequests] = useState(false);
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [filterOption, setFilterOption] = useState('latest'); // Default filter option
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrayerPoint, setEditedPrayerPoint] = useState('');
  const [editedPrayerIndex, setEditedPrayerIndex] = useState(null);

  const navigate = useNavigate();


  const handleEditRequest = (index) => {
    // Set the editing state, edited prayer point, and index
    setIsEditing(true);
    setEditedPrayerPoint(prayerRequests[index].point);
    setEditedPrayerIndex(index);
  };

  const handleCancelEdit = () => {
    // Reset editing state and edited prayer point
    setIsEditing(false);
    setEditedPrayerPoint('');
    setEditedPrayerIndex(null);
  };

  const handleSaveEdit = () => {
    // Create a copy of the current prayer requests array
    const updatedPrayerRequests = [...prayerRequests];

    // Update the prayer point at the specified index
    updatedPrayerRequests[editedPrayerIndex].point = editedPrayerPoint;

    // Update the state and localStorage
    setPrayerRequests(updatedPrayerRequests);
    localStorage.setItem('prayerRequests', JSON.stringify(updatedPrayerRequests));

    // Reset editing state and edited prayer point
    setIsEditing(false);
    setEditedPrayerPoint('');
    setEditedPrayerIndex(null);
  };

  const handleDeleteRequest = (index) => {
    // Create a copy of the current prayer requests array
    const updatedPrayerRequests = [...prayerRequests];

    // Remove the prayer request at the specified index
    updatedPrayerRequests.splice(index, 1);

    // Update the state and localStorage
    setPrayerRequests(updatedPrayerRequests);
    localStorage.setItem('prayerRequests', JSON.stringify(updatedPrayerRequests));
  };



  useEffect(() => {
    // Load data from local storage when the component mounts

    const storedPrayerRequests = localStorage.getItem('prayerRequests');
    if (storedPrayerRequests) {
      setPrayerRequests(JSON.parse(storedPrayerRequests));
    }
  }, []); // The empty dependency array ensures this runs only once on mount


  const handleNewPrayerRequest = () => {
    setFormOpen(true);
    setViewingRequests(false);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleFormSubmit = (newPrayerRequest) => {
    // Update the state correctly by using the callback function
    setPrayerRequests((prayerRequests) => [...prayerRequests, newPrayerRequest]);

    // Update localStorage with the correct state
    localStorage.setItem(
      'prayerRequests',
      JSON.stringify([...prayerRequests, newPrayerRequest])
    );
  };

  const handleViewRequests = () => {
    setViewingRequests(true);
    setFormOpen(false);
  };

  const handleRemovingPrevious = () => {
    // Clear local storage
    localStorage.clear();

    // Clear the state
    setPrayerRequests([]);
  };

  const handleDownloadPDF = () => {
    const customFilename = window.prompt('Enter a custom filename for the PDF:', 'prayer_requests');
  
    if (customFilename !== null) {
      // Generate PDF content
      const pdf = new jsPDF();
  
      // Customize PDF styling
      pdf.setFontSize(18);
      pdf.setTextColor(40, 40, 40); // Text color in RGB
      pdf.text('Prayer Requests', 20, 20);
  
      // Set background color for the header
      pdf.setFillColor(200, 200, 200); // Background color in RGB
      pdf.rect(10, 10, 190, 12, 'F'); // Draw a filled rectangle for the header
  
      // Set font size and color for the content
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Reset text color
  
      // Draw prayer requests
      prayerRequests.forEach(({ point, date }, index) => {
        const yPos = 30 + (index * 12); // Adjust the vertical position
        pdf.text(`${point} - ${date}`, 20, yPos);
      });
  
      // Save the PDF with the custom filename
      pdf.save(`${customFilename}.pdf`);
    }
  };
  
  const handleLogout = () => {
    // Perform any logout logic here

    // Navigate to the login screen
    navigate('/login'); // Replace '/login' with your actual login route
  };

  return (
    <div className="dashboard-container">
      
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <h1>Welcome to the Prayer Requests Zone!</h1>
      <button style={{height:'40px', borderWidth:'0', borderRadius:'5px', backgroundColor:'red', color:'white', marginLeft:'40px'}}           onClick={handleLogout}
>Logout</button>
      </div>
      <div className="prayerRequest">
        <Button onClick={handleNewPrayerRequest}>New Prayer Request</Button>
        <Button onClick={handleViewRequests}>Previous Prayer Requests</Button>
        <Button onClick={handleRemovingPrevious}>Clear Previous Prayer Request</Button>
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
      </div>

      {!isViewingRequests && (
        <PrayerRequestForm open={isFormOpen} onClose={handleCloseForm} onFormSubmit={handleFormSubmit} />
      )}


      {isViewingRequests && (
        <div className="centered-container">
          <div style={{display:'flex', flexDirection:'row', alignContent:'baseline'}}>
          <h2>Previous Prayer Requests</h2>

          <h2><button style={{backgroundColor:'green', padding:'5px', margin:'5px 15px', borderRadius:'10px', color:'#fff', fontSize:'18px', borderWidth:'0'}}>Filter</button></h2>
          </div>
          <List>
            {prayerRequests.map(({ point, date }, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index+1}.  ${point} - [${date}]`} />
                <Button
                  style={{color: 'red', marginLeft:'10px', backgroundColor:'white'}}
                  onClick={() => handleDeleteRequest(index)}>
                    Delete
                  </Button>
                  <Button
                      style={{ color: 'blue', marginLeft: '10px',backgroundColor:'white' }}
                      onClick={() => handleEditRequest(index)}
                    >
                      Edit
                    </Button>
                    {isEditing && editedPrayerIndex === index && (
                  <>
                  <TextField
                      fullWidth
                      value={editedPrayerPoint}
                      onChange={(e) => setEditedPrayerPoint(e.target.value)}
                      // Additional onChange handler for TextField
                      InputProps={{
                        readOnly: false, // Allows editing
                      }}
                    />
                    <Button
                      style={{ color: 'green', marginLeft: '10px', backgroundColor:'white' }}
                      onClick={handleSaveEdit}
                    >
                      Save
                    </Button>
                    <Button
                      style={{ color: 'gray', marginLeft: '10px',backgroundColor:'white' }}
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
