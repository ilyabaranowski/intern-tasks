import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useSettings, useSettingsDispatch } from '../context/SettingsContext.jsx';

export default function RegionSelect({ locales }) {
    const { region } = useSettings();
    const dispatch = useSettingsDispatch();

    const handleChange = (event) => {
        dispatch({
            type: 'setRegion',
            value: event.target.value,
        })
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Region</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={region}
                    label="Region"
                    onChange={handleChange}
                >   {locales.map((loc) => <MenuItem value={loc.value} key={loc.value}>{loc.title}</MenuItem>)}

                </Select>
            </FormControl>
        </Box>
    );
}
