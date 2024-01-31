import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useUser } from '../UserContext';

const ViewEmergencyPrayers = (props) => {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedPrayer, setEditedPrayer] = useState(null);
  const { email } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const querySnapshot = await db
            .collection('PrayerRequests')
            .where('EmailofUser', '==', email)
            .get();

          const prayerData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setPrayers(prayerData);
          setLoading(false);
        } else {
          console.error('User information not available in context');
        }
      } catch (error) {
        console.error('Error fetching prayers:', error);
      }
    };

    fetchData();
  }, [email, editedPrayer]);

  const handleEdit = (prayer) => {
    setEditMode(true);
    setEditedPrayer({ ...prayer });
  };

  const handleEditSave = async (editedPrayer) => {
    console.log('Attempting to update prayer with ID:', editedPrayer.id);
    console.log('Edited prayer:', editedPrayer);
  
    try {
      await db.collection('PrayerRequests').doc(editedPrayer.id).update(editedPrayer);
      console.log('Prayer updated successfully');
      setEditMode(false);
      setEditedPrayer(null);
      setPrayers((prevPrayers) =>
        prevPrayers.map((prayer) => (prayer.id === editedPrayer.id ? editedPrayer : prayer))
      );
    } catch (error) {
      console.error('Error saving edited prayer:', error);
    }
  };
  const handleDelete = async (prayerId) => {
    try {
      await db.collection('PrayerRequests').doc(prayerId).delete();
      setPrayers((prevPrayers) => prevPrayers.filter((prayer) => prayer.id !== prayerId));
    } catch (error) {
      console.error('Error deleting prayer:', error);
    }
  };

  return (
    <div>
      {/* <h2>My Prayer Requests</h2> */}
      {prayers.map((prayer) => (
        <ListItem key={prayer.id} component="div" disablePadding>
          <ListItemButton>
            {editMode && prayer.id === editedPrayer.id ? (
              <>
                <input
                  type="text"
                  value={editedPrayer.NameofCandidate}
                  onChange={(e) => setEditedPrayer({ ...editedPrayer, NameofCandidate: e.target.value })}
                />
                <input
                  type="text"
                  value={editedPrayer.PrayerPoint}
                  onChange={(e) => setEditedPrayer({ ...editedPrayer, PrayerPoint: e.target.value })}
                />
                <button onClick={() => handleEditSave(editedPrayer)}>Save</button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
              </>
            ) : (
              <ListItemText style={{background:'#ded6a2', borderRadius:'20px', padding:'10px', margin:'10px'}} primary={`${prayer.NameofCandidate}: ${prayer.PrayerPoint}`} />
            )}
            <ListItemIcon>
              <EditIcon onClick={() => handleEdit(prayer)} />
            </ListItemIcon>
            <ListItemIcon>
              <DeleteIcon onClick={() => handleDelete(prayer.id)} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      ))}
    </div>
  );
};

export default ViewEmergencyPrayers;
