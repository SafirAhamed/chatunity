import { Button, useTheme } from '@mui/material';
import React from 'react';

const PrimaryButton = ({ value, variant,onClick }) => {
    const theme = useTheme();

    const buttonStyle = {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.grey[900],
        fontWeight:'600'
    };

    return (
        <Button variant={variant || "contained"} style={buttonStyle} onClick={onClick}>
            {value}
        </Button>
    );
};

export default PrimaryButton;
