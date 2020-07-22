import React, { useState, useEffect } from 'react';
import './App.css';

import FormInput from './components/formInput/FormInput';
import MessegeItem from './components/messegeItem/MessegeItem';

import db from './firebase'
import firebase from 'firebase'

import FlipMove from 'react-flip-move'

import logo from './assets/messenger-logo.png'

import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Input } from '@material-ui/core';

const getModalStyle = () => {
  const top = 45;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-50%, -50%)`,
    textAlign: 'center',
    border: 'none',
    outline: 'none'
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 3),
  }
}));

const App = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)

  const [input, setInput] = useState('');
  const [messeges, setMesseges] = useState([]);
  const [userName, setUsername] = useState('');
  const [userInput, setUserInput] = useState('')

  const [open, setOpen] = useState(true)

  useEffect(() => {
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
      <Modal
        open={open}
        onClose={open}
      >
        <div style={modalStyle} className={classes.paper}>
          <form style={{display: 'flex', flexDirection: 'column' }} onSubmit={() => {
            setUsername(userInput)
            setUserInput('')
            setOpen(false)
          } }>
            <Input 
              required
              type='text'
              color='primary'
              placeholder='Enter Your Name'
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              className='input'
            />
            <Button type='submit'>Confirm</Button>
          </form>
        </div>
      </Modal>
      <img src={logo} alt='messenger clone logo' width='150' />
      <h1>Messenger Clone</h1>
      <h3>Welcome {userName} </h3>
      { userName &&
        <FlipMove>
          {
            messeges.map(messege => {
              return <MessegeItem messege={messege} MyUserName={userName} key={messege.id} />
            })
          }
        </FlipMove>
      }
      <FormInput 
        messegesHandler={messegesHandler}
        inputHandler={inputHandler}
        input={input}
      />
    </div>
  );
}

export default App;
