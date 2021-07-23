import React from 'react';
import { TextField, Grid } from '@material-ui/core'

const ReadOnly = ({ name, label, half, autoFocus, value, error, helperText }) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField 
            error={error}
            helperText={helperText}
            name={name}
            variant="outlined"
            required
            fullWidth
            size="small"
            label={label}
            autoFocus={autoFocus}
            defaultValue={value}
            InputProps={{
                readOnly: true,
            }}
        />
    </Grid>
)
export default ReadOnly;
