import React, { useState } from 'react';
import { useUser } from './UserContext';
import { TextField, Select, MenuItem, FormControl, InputLabel , Button, Alert, Snackbar, ButtonGroup} from '@mui/material';
import { db } from './firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import   ViewEmergencyPrayers from   '../src/Prayers/ViewEmergencyPrayers';
import ViewMyPrayerReq from '../src/Prayers/ViewMyPrayerReq'

const TestForm = () => {
  const [isBoxOpen , setIsBoxOpen] = useState(false);
  const [viewPrayers, setViewPrayers] = useState(false);
  
  const [formOpen, setFormOpen] = useState(isBoxOpen);

  const handleClick = () => {
      setIsBoxOpen(!isBoxOpen);
      
  }

  const handlePrayers = () => {
    setViewPrayers(!viewPrayers);
  }



  return(
    <div style={{ display: 'flex', height: '100vh'}}>

    <div style={{flex:'1', padding:'8px'}}>
    <Button onClick={handleClick} variant="contained">Prayer Form</Button>
    {isBoxOpen && <OpenForm/>}  
    </div>

    <div style={{flex:'1' , padding:'8px' , background:'#e89682', margin:'20px 10px', borderRadius:'10px'}}>
     <Button variant='contained' onClick={handlePrayers}>Emergency Prayers</Button>
     {viewPrayers && <ViewEmergencyPrayers/>}
     </div>

     <div style={{flex:'1', padding:'8px', background:'#e89682', margin:'20px 10px' , borderRadius:'10px'}}>
     <Button variant='contained' onClick={handlePrayers}>My Prayers </Button>
     {viewPrayers && <ViewMyPrayerReq/>}
     </div>


  </div>
  )
}

const OpenForm = ({setFormOpen}) => {
  
  const [successMessage, setSuccessMessage] = useState('');

  const [prayerRequests, setPrayerRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [textFieldName, setTextFieldName] = useState('');
  const [textFieldPrayerFor, setTextFieldPrayerFor] = useState('');
  const [showPrayerForm,  setShowPrayerForm] = useState(false);
  const [openSuccessBanner, setOpenSuccessBanner] = useState(false);
  const [open, setOpen] = React.useState(false);


  const { email, name } = useUser();
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

  //Select Category 
  const [category, setCategory] = useState('');


  const handleCategroyChange = (event) => {
    setCategory(event.target.value);
  };


  const handleTextFieldChange = (event) => {
    setTextFieldName(event.target.value);
  };

  const handleTextFieldChangeOne = (event) => {
    setTextFieldPrayerFor(event.target.value);
  };
  
  const handleSubmit = async () => {
    setLoading(true); // Show loading indicator

    try {
      const prayerRequest = {
        NameofCandidate: textFieldName,
        PrayerPoint: textFieldPrayerFor,
        PrayerCategory: category,
        EmailofUser: email,
        NameofUser: name,
        Date: formattedDate,
      };
  
      // Add prayer request to Firestore
      const docRef = await addDoc(collection(db, 'PrayerRequests'), prayerRequest);
      console.log('Document written with ID: ', docRef.id);
  
      // Success actions
      setSuccessMessage('Your prayer request has been recorded!');
      setOpen(true);

      setOpenSuccessBanner(true);

      setFormOpen('false');

     
  
      // Clear form fields
      textFieldName('');
      textFieldPrayerFor('');
      category('');
    } catch (error) {
      // Error handling
      console.error('Error adding document: ', error);
      // Display appropriate error message to the user
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div style={{   background: '#e1f0b9', borderRadius:'3px', padding:'30px' }}>
       <TextField fullWidth
        id="outlined-basic"
        label="Prayer For"
        variant="outlined"
        style={{ margin: '20px 0' }} 
        value={textFieldName}
        onChange={handleTextFieldChange}
      />

      <TextField fullWidth
        id="outlined-basic-one"
        label="Prayer Point"
        variant="outlined"
        style={{ margin: '30px 0' }} 
        value={textFieldPrayerFor}
        onChange={handleTextFieldChangeOne}
      />

     
        <FormControl fullWidth style={{ margin: '30px 0' }} >
            <InputLabel variant="outlined" id="demo-simple-select-label">
              Category
            </InputLabel>


            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"

              value={category}
              label="Category"
              onChange={handleCategroyChange}
            >
              <MenuItem  value="addiction">Addiction to Alcohol and Drugs</MenuItem>
              <MenuItem value="health">Health Improvement</MenuItem>
              <MenuItem value="accident">Accident Recovery</MenuItem>
              <MenuItem value="exam">Exam Preparation</MenuItem>
              <MenuItem value="emergency">Emergency</MenuItem>
              <MenuItem value="childhealth">Childrens Health</MenuItem>
              <MenuItem value="oldhealth">Old People Health</MenuItem>         
              <MenuItem value="cancer">Cancer Disease</MenuItem>
              <MenuItem value="general">General Request</MenuItem>
            </Select>

          </FormControl>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your Prayer Request is Saved!
        </Alert>
      </Snackbar>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
    </div>
  );
};





export default TestForm;