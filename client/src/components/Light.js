import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Light(props) {
    const [lightStatus, setLightStatus] = useState('');

    function handleChange(event){
        const newStatus = event.target.value;
        setLightStatus(newStatus);

        // send the current light status to App.js
        const newLight = {
            number: props.lightNum,
            status: newStatus
        }
        props.onAdd(newLight);
    };

    return (
        <div>
            <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Indicator light number {props.lightNum}</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={lightStatus}
                label="light status"
                onChange={handleChange}
                >
                <MenuItem value={'off'}>off</MenuItem>
                <MenuItem value={'on'}>on</MenuItem>
                <MenuItem value={'blinking'}>blinking</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default Light