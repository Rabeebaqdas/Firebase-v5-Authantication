import React, { useEffect, useState } from 'react';
import './fire';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Hero from './Hero';
import Login from './Login';
import './App.css';
function App() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)


  const clearInput = () => {
    setEmail('');
    setPassword('');
  }

  const clearError = () => {
    setEmailError('');
    setPasswordError('');
  }


  const handleLogin = () => {
    clearError();
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }

      }
      )
  }

  const handleSignup = () => {
    clearError();
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/email-already-in-use":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      })
  }


  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut();
  }


  const authListener = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=> {
 
      if (user) {     
      
        clearInput('');
        setUser(user);
      }
      else {
        setUser('');
      }
    })
  }

  useEffect(() => {
    authListener();
  }, []);



  return (
    <div className="App">
      {user
        ?
        <Hero handleLogout={handleLogout} />
        :
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      }
    </div>
  );
}

export default App;
