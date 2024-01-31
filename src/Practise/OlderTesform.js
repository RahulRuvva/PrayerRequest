import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, List, ListItem, ListItemText } from '@mui/material';
import { db } from '../firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';

const styles = {
  closeButton: {
    marginLeft: '10px',
  },
  formContainer: {
    '& > :not(style)': {
      m: 1,
      width: '25ch',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  newButtoneContainer: {
    display:'flex'

  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin:  '10px 10px',
  },
};

export default function BasicTextFields() {
  const [textFieldName, setTextFieldName] = useState('');
  const [textFieldPrayerFor, setTextFieldPrayerFor] = useState('');
  const [category, setCategory] = useState('');
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [showPrayerList, setShowPrayerList] = useState(false);

  const { email, name } = useUser();
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

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
    setLoading(true);
    try {
      const prayerRequest = {
        NameofCandidate: textFieldName,
        PrayerPoint: textFieldPrayerFor,
        PrayerCategory: category,
        EmailofUser: email,
        NameofUser: name,
        id: uuidv4(),
        Date: formattedDate,
      };

      // Add a new document to the 'PrayerRequests' collection in Firestore
      const docRef = await addDoc(collection(db, 'PrayerRequests'), {
        ...prayerRequest,
      });

      console.log('Document written with ID: ', docRef.id);

      // Clear the form fields after successful submission
      setTextFieldName('');
      setTextFieldPrayerFor('');
      setCategory('');
      setLoading(false);
      setShowPrayerForm(false);
    } catch (error) {
      console.error('Error adding document: ', error);
      setLoading(false);
    }
  };

  const getPrayerRequests = async () => {
    try {
      const prayerRequestsCollection = collection(db, 'PrayerRequests');
      const prayerRequestsSnapshot = await getDocs(prayerRequestsCollection);
      const prayerRequestsData = prayerRequestsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPrayerRequests(prayerRequestsData);
    } catch (error) {
      console.error('Error fetching prayer requests:', error);
    }
  };

  useEffect(() => {
    // Fetch prayer requests when the component mounts
    getPrayerRequests();
  }, []);

  return (
    <>
    <div style={styles.newButtoneContainer}>
      <div style={styles.buttonContainer}>
        <Button variant="contained" onClick={() => setShowPrayerForm(!showPrayerForm)}>Prayer Request Form</Button>
        {showPrayerForm && (
          <Button style={styles.closeButton} onClick={() => setShowPrayerForm(false)}>Close Form</Button>
        )}
      </div>
      {showPrayerForm && (
        <Box
          component="form"
          sx={styles.formContainer}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Prayer For"
            variant="outlined"
            value={textFieldName}
            onChange={handleTextFieldChange}
          />

          <TextField
            id="outlined-basic-one"
            label="Prayer Point"
            variant="outlined"
            value={textFieldPrayerFor}
            onChange={handleTextFieldChangeOne}
          />

          <FormControl fullWidth>
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
              <MenuItem value="addiction">Addiction</MenuItem>
              <MenuItem value="health">Health</MenuItem>
              <MenuItem value="accident">Accident</MenuItem>
              <MenuItem value="exam">Exam</MenuItem>
              <MenuItem value="general">General</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      )}

      <div style={styles.buttonContainer}>
        <Button variant="contained" onClick={() => setShowPrayerList(!showPrayerList)}>View the Prayer List Form</Button>
        {showPrayerList && (
          <Button style={styles.closeButton} onClick={() => setShowPrayerList(false)}>Close List</Button>
        )}
      </div>
      {showPrayerList && (
        <div>
          <List>
            {prayerRequests.map((request, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={request.NameofCandidate}
                  secondary={request.PrayerPoint}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
      </div>
    </>
  );
}
