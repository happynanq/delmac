import React from 'react'
import { Body } from './components/Body';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { AuthContext } from './Context/AuthContext';
import { useAuth } from './hooks/auth.hook';


function App() {
  const {login, logout, userID, token} = useAuth()
  const isAuthenticated = !!token
  return (
    <AuthContext.Provider value = {{
      token, login, logout, userID, isAuthenticated
    }}>
      <Header/>
      <Body/>
      <Footer/>
    </AuthContext.Provider>
  );
}

export default App;
