import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {ListItem ,ListItemButton ,ListItemText } from '@mui/material';


const ViewEmergencyPrayers = (props) => {
 
    const { index, style } = props;  
    const [prayers, setPrayers] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch data from Firestore where PrayerCategory is 'emergency'
          const querySnapshot = await db.collection('PrayerRequests').where('PrayerCategory', '==', 'emergency').get();
  
          // Extract data from query snapshot
          const prayerData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPrayers(prayerData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching prayers:', error);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        {/* <h2>Emergency Prayer Requests</h2> */}
        <ul>
          {prayers.map(prayer => (
            <ListItem style={style} key={prayer.id} component="div" disablePadding>
               <ListItemButton>
  
               <ListItemText style={{background:'#ded6a2', borderRadius:'20px', padding:'10px', margin:'10px'}} primary={`${prayer.NameofCandidate}: ${prayer.PrayerPoint}`} />
               </ListItemButton>
            </ListItem >
          ))}
        </ul>
      </div>
    );
  };

  export default ViewEmergencyPrayers;
  

