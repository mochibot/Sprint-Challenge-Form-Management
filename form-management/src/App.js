import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom'; 
import PrivateRoute from './utilities/PrivateRoute';
import Register from './components/Register';
import FoodList from './components/FoodList';
import useLocalStorage from '../src/hooks/useLocalStorage';
import './App.scss';

function App() {
  const [token, setToken] = useLocalStorage('userToken')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      console.log('testing')
    }
  }, [token])

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('userToken')
    setIsLoggedIn(false);
  }

  return (
    <div className="app">
    <header className='app-header'>
      {!isLoggedIn ? <Link to='/' >Register</Link> : <Link to='/' onClick={logout}>Logout</Link> }
      <Link to='/content'>Content</Link>
    </header>
    <div className='app-content'>
      <Route exact path='/' render={(props) => <Register {...props} setToken={setToken} setIsLoggedIn={setIsLoggedIn} />} />
      <PrivateRoute exact path='/content' component={FoodList}/>
    </div>
  </div>
  );
}

export default App;
