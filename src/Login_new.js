import React, { useState } from 'react'
import {db} from './firebase';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import {getDocs, collection, where, query} from 'firebase/firestore'
import Dashboard from './Dashboard';
import { useUser } from './UserContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';




const Login_new = () => {
    
    const { setEmail: setEmailContext } = useUser(); 
    const {setName: setNameContext} = useUser();
    const [localEmail, setLocalEmail] = useState('');
    const [password, setPassword] = useState('')

    const navigate = useNavigate(); // Use react-router-dom's useNavigate hook

    const login = async() => 
    {
        const dbref = collection(db , 'Auth')
        try 
        {
            const emailMatch = query(dbref, where('Email', '==', localEmail))
            const passwordMatch = query(dbref, where('Password', '==', password))
            const emailSnapShot =await getDocs(emailMatch)
            const emailArray = emailSnapShot.docs.map((doc) => doc.data())
            
            const passwordSnapShot =await getDocs(passwordMatch)
            const passwordArray =  passwordSnapShot.docs.map((doc) => doc.data())

            if(emailArray.length > 0 && passwordArray.length > 0){
                    alert('Login Successful');
                    console.log('Email before navigation:', localEmail);

                    // Fetch additional details (like name) using the user's email
        const userDetailsSnapshot = await getDocs(query(dbref, where('Email', '==', localEmail)));
        const userDetails = userDetailsSnapshot.docs.map((doc) => doc.data());

        // Assuming that each email is unique, userDetails[0] should contain the user details
        const userName = userDetails[0]?.Name;
        console.log(userName);
        setNameContext(userName);
        

                   // Set email in the context state
                    setEmailContext(localEmail);
                    
                    console.log(localEmail);
                    /// Check if the logged-in user is an admin
                if (localEmail === 'admin@gmail.com') {
                    // If the email is admin@gmail.com, navigate to AdminDashboard
                    navigate('/admin-dashboard');
                } else {
                    // If it's a regular user, navigate to Dashboard
                    alert('Succesful')
                    navigate('/formUser');
                }
                }
            else {
                alert('Check Correct email and password');
            }
        }
        catch (error) 
        {

        }
    }
  return (
    <div className='container'>
        <div className='form'>
            <h2>Login</h2>
            <div className='form-label'>

            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setLocalEmail(e.target.value)} /> 
            </div>


            
            <div className='form-label'>
            <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} /> 
                    
            </div>


            <button onClick={login}>Login</button>
            <p>Don't have an Account?    <Button variant="contained" href="./signup">
        Sign Up
      </Button> </p>


        </div>
    </div>
  )
}

export default Login_new