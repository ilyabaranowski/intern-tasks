import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

import { useSettings, useSettingsDispatch } from '../context/SettingsContext.jsx';

const Input = styled(MuiInput)`
  width: 72px;
`;

export default function Errors() {
    const { errorsCount: value } = useSettings();
    const dispatch = useSettingsDispatch();
    const setValue = (value) => dispatch({
        type: 'setErrors',
        value: value,
    })

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === "" ? 0 : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 1000) {
            setValue(1000);
        }
    };

    return (
        <>
            <Typography id="input-slider" gutterBottom>
                Errors
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof value === "number" ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        step={0.25}
                        marks
                        min={0.00}
                        max={10.00}
                        valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 0.25,
                            min: 0,
                            max: 1000,
                            type: "number",
                            "aria-labelledby": "input-slider",
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}
