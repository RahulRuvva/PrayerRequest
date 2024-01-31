import React, { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import './Sign_Up.css';


const AdminDashboard = () => {
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingRequestTime, setEditingRequestTime] = useState(null);
  const [newPoint, setNewPoint] = useState('');
  
  // Function to fetch all prayer requests
  const getPrayerRequests = async () => {
    try {
      const prayerRequestsCollection = collection(db, 'prayerRequests');
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
  }, []); // The empty dependency array ensures this runs only once on mount


  
  const handleEdit = (request) => {
    setEditMode(true);
    setEditingRequestTime(request.time);
  };

  const handleSaveEdit = async () => {
    try {
      const docRef = doc(db, 'prayerRequests', editingRequestTime); // Use time as document ID
      await updateDoc(docRef, {
        point: newPoint,
      });

      console.log('Prayer point updated successfully!');
      setEditMode(false);
      setEditingRequestTime(null);
      setNewPoint('');

      // Fetch updated prayer requests
      getPrayerRequests();
    } catch (error) {
      console.error('Error updating prayer point:', error);
    }
  };

  const handleDelete = async (requestTime) => {
    try {
      const docRef = doc(db, 'prayerRequests', requestTime);
      await deleteDoc(docRef);

      console.log('Prayer request deleted successfully!');
      // Fetch updated prayer requests
      getPrayerRequests();
    } catch (error) {
      console.error('Error deleting prayer request:', error);
    }
  };
  return (
    <div>
      <h3>Welcome Admin</h3>

      {/* Display fetched prayer requests */}
      <div>
        <h1>Prayer Requests</h1>
        <table border="1">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Date</th>
              <th>Prayer Points</th>
              <th>Time</th>

              
            </tr>
          </thead>
          <tbody>
          {prayerRequests.map((request, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{request.name}</td>
                <td>{request.date}</td>
                <td>
            {editMode && editingRequestTime === request.time ? (
              <input type="text" value={newPoint} onChange={(e) => setNewPoint(e.target.value)} />
            ) : (
              request.point
            )}
            {editMode && editingRequestTime === request.time ? (
              <button onClick={handleSaveEdit}>Save</button>
            ) : (
              <button onClick={() => handleEdit(request)}>Edit</button>
            )}
            <button onClick={() => handleDelete(request.time)}>Delete</button>
          </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
