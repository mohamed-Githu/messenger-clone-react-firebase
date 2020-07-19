import React, { useState, useEffect } from 'react';
import './App.css';

import FormInput from './components/formInput/FormInput';
import MessegeItem from './components/messegeItem/MessegeItem';

import db from './firebase'
import firebase from 'firebase'

import FlipMove from 'react-flip-move'

import logo from './assets/messenger-logo.png'

const App = () => {
  const [input, setInput] = useState('');
  const [messeges, setMesseges] = useState([]);
  const [userName, setUsername] = useState('');

  useEffect(() => {
    setUsername(prompt('Please Enter Your Username'))

    db.collection('messeges').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMesseges(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }))
    })
  }, [])

  const inputHandler = e => setInput(e.target.value);

  const messegesHandler = e => {
    e.preventDefault();
    if (input) {
      db.collection('messeges').add({
        userName: userName,
        text: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }); 
      setInput('');
    }
  }

  return (
    <div className="App">
      <img src={logo} alt='messenger clone logo' width='150' />
      <h1>Messenger Clone</h1>
      <h3>Welcome {userName} </h3>
      <FlipMove>
        {
          messeges.map(messege => {
            return <MessegeItem messege={messege} MyUserName={userName} key={messege.id} />
          })
        }
      </FlipMove>

      <FormInput 
        messegesHandler={messegesHandler}
        inputHandler={inputHandler}
        input={input}
      />
    </div>
  );
}

export default App;
