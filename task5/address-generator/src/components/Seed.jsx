// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import InputAdornment from '@mui/material/InputAdornment';

import { useSettings, useSettingsDispatch } from '../context/SettingsContext.jsx';

export default function Seed() {
    const { seed } = useSettings();
    const dispatch = useSettingsDispatch();
    const setValue = (value) => dispatch({
        type: 'setSeed',
        value: value,
    })

    const handleInputChange = (event) => {
        setValue(event.target.value === "" ? 0 : Number(event.target.value));
    };

    const onClick = () => {
        const randomSeed = Math.floor(Math.random() * 1000000)
        setValue(randomSeed)
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >

            <TextField
                id="outlined-number"
                label="Seed"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                value={seed}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton edge="start" color="primary" onClick={onClick}>
                                <ShuffleIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>

    )
}
