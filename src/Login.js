import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('user');

  const navigate = useNavigate();

  const handleLogin = () => {
    if (
      (activeTab === 'user' && username === 'user' && password === 'user123') ||
      (activeTab === 'admin' && username === 'admin' && password === 'admin123')
    ) {
      alert('Login successful!');

      if (activeTab === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      alert('Incorrect username or password. Please try again.');
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="LoginPage">
      <div className="loginTabs">
        <button
          style={{ background: 'red', color: 'white', margin: '5px', borderRadius: '10px', padding: '15px', fontSize: '24px', borderWidth: '0' }}
          onClick={() => handleTabClick('user')}
          className={activeTab === 'user' ? 'activeTab' : ''}
        >
          User Login
        </button>
        <button
          style={{ background: 'red', color: 'white', margin: '5px', borderRadius: '10px', padding: '15px', fontSize: '24px', borderWidth: '0' }}
          onClick={() => handleTabClick('admin')}
          className={activeTab === 'admin' ? 'activeTab' : ''}
        >
          Admin Login
        </button>
      </div>

      <div className="loginInputs">
        <div className="loginInputsTags">
          <label>
            <h4>{activeTab === 'user' ? 'User' : 'Admin'}name</h4>
          </label>
          <input
            style={{ margin: 'auto', borderRadius: '15px', padding: '5px', borderWidth:'0' }}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
          />
        </div>

        <div className="loginInputsTags">
          <label>
            <h4>Password</h4>
          </label>
          <input
            style={{ margin: 'auto', borderRadius: '15px', padding: '5px', borderWidth:'0' }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
        </div>

        <div className="loginInputsTags">
          <input
            style={{ margin: 'auto', borderRadius: '15px', padding: '8px 25px', fontSize: '14px', borderWidth: 0 }}
            type="submit"
            onClick={handleLogin}
            label="Submit"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
