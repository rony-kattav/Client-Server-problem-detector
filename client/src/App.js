import React, {useState} from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Light from './components/Light';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

function App() {
  const LIGHTS = 3;
  const [userID, setUserID] = useState('');
  const [problem, setProblem] = useState('');
  const [serialNum, setSerialNum] = useState('');
  const [lights, setLights] = useState([]);

  // save the lights status
  function addLight(newLight){
    // delete the last light with the same number
    setLights(curr =>
      curr.filter(light => light.number !== newLight.number)
    );
    
    // update the new lights array with the new light
    setLights(prevLights => {
      return [...prevLights, newLight]
    })
  }

  // save the userID
  function handleUserID(event){
    const newID = event.target.value;
    setUserID(newID);
  }

  // save the user problem
  function handleProblem(event){
    const newProblem = event.target.value;
    setProblem(newProblem);
  }

  // save the user serial number
  function handleSerialNum(event){
    const newNum = event.target.value;
    setSerialNum(newNum);
  }

  // send the user input to the server if valid
  function sendData() {
    const userData = {
      userID: userID,
      problem: problem,
      serialNum: serialNum,
      lightsStatus: lights,
      NumberOfLights: LIGHTS
    }

    // check all fields are not empty
    if(userID === '' || problem === '' || serialNum === '' || lights.length < LIGHTS){
      alert("please enter all fields below")
    } else {
      // send the user input to the server
      axios.post('http://localhost:5000/responseStatus', {userData: userData}).then((res) => {
        alert("response status: " + res.data);
      }).catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <div>
      <h1 className='headline'>Hello, please enter the following details<br />
      so we can help you detect your broblem</h1>
      <form className='user-input'>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <TextField 
              id="outlined-basic"
              variant="outlined"
              label="User ID" 
              type="number"
              onChange={handleUserID}
              value={userID}
              helperText="Please enter numbers only"
              fullWidth={true}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Problem description"
              multiline
              inputProps={{ maxLength: 300 }}
              rows={3}
              onChange={handleProblem}
              value={problem}
              helperText="For example: My device is making weird noises"
              fullWidth={true}
            />
          </Grid>
          <Grid xs={12}>
            <TextField 
              label="Device serial number" 
              inputProps={{ maxLength: 64 }}
              onChange={handleSerialNum}
              value={serialNum}
              helperText="For example: 24-X-125447-DC"
              fullWidth={true}
            />
          </Grid>
          <Grid xs={12}>
            <p>Please select the lights status of your device:</p>
            <List sx={{overflow: 'auto', maxHeight: 200}}>
              {[...Array(LIGHTS),]
              .map((light, index) => (
              <Light key={index} lightNum={index + 1} onAdd={addLight}/>
              ))}
            </List>
          </Grid>
          <Grid xs={12}>
            <Button onClick={sendData} fullWidth={true} variant="outlined">Send</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default App;
