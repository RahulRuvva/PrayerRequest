 import './App.css';
import { BrowserRouter as Router, Route, Routes, Form } from 'react-router-dom';
import SideNav from './Sidebar';
// import Dashboard from './Dashboard';
import Signup from './Sign_Up';
import Login_new from './Login_new';
import AdminDashboard from './AdminDashboard';
 import TestForm from './TestForm';
import { UserProvider } from './UserContext';
import ListItems from './Practise/ListItems';
import NewList from './Practise/NewList';



function App() {
  
  return (
    <div className="App">
 <Router>

  <UserProvider>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login_new/>} />
        <Route path='/formUser' element= {<TestForm />} />
        <Route path='/practise' element= {<NewList />} />

              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/sidenav" element={<SideNav />} />

      </Routes>
      </UserProvider>

    </Router>    </div>
  );
}

export default App;