import React, { useState } from 'react'
import {db} from './firebase';
import './Sign_Up.css';
import { Link } from 'react-router-dom';
import {getDocs, addDoc, collection, where, query} from 'firebase/firestore'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const Sign_Up = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});


    const[metch, setMetch] = useState([])
    const dbref = collection(db, "Auth");


    const signup = async() => 
    {
        
     // Perform validations
     const validationErrors = {};
     if (!name) validationErrors.name = 'Name is required';
     if (!email) validationErrors.email = 'Email is required';
     if (!password) validationErrors.password = 'Password is required';
 
     setErrors(validationErrors);
 

        const matchEmail = query(dbref, where('Email', '==', email))
        try 
        {
            const snapshot = await getDocs(matchEmail)
            const emailMatchingArray = snapshot.docs.map((doc) => doc.data())
            if(emailMatchingArray.length > 0) 
            {
                alert('Email Already Exsists')
            }
            else 
            {
                await addDoc(dbref, {Name: name, Email: email, Password: password})
                alert('Succesfully Created new account')
    
            }
        }
        catch(error) {
                alert('Error')
        }
       
    }


  return (
    <div className='container'>
        <div className='form'>
            <h2>Sign Up</h2>
            <div className='form-label'>
                <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setName(e.target.value) } 
                  sx={{
                    fontFamily: 'Poppins', // Replace with your desired font
                    fontSize: 28, // Override base font size
                    color: '#f00', 
                  }} />

                {errors.name && <p className='error'>{errors.name}</p>}
            </div>

            <div className='form-label'>
                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value) } />

                {errors.email && <p className='error'>{errors.email}</p>}

            </div>


            <div className='form-label'>   
                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value) } />

                {errors.password && <p className='error'>{errors.password}</p>}

            </div> 
            

            <div className='box'>
            
            </div>

          
            <Button onClick={signup} variant="contained">Sign Up</Button>
           <p>Alread have an Account ? <Button variant="contained" href="./login">
        Sign In
      </Button> </p>

        </div>
    </div>
  )
}

export default Sign_Up