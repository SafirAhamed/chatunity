import React from "react";
import { Autocomplete, TextField, createTheme, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black color for primary
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          color: '#000000', // Ensure the text color is black
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000000', // Border color for the outlined variant
            },
            '&:hover fieldset': {
              borderColor: '#000000', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000', // Border color when focused
            },
          },
          '& .MuiInputLabel-root': {
            color: '#000000', // Label color
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#000000', // Label color when focused
          },
        },
      },
    },
  },
});

const useStyles = makeStyles({
  textField: {
    '& .MuiInputBase-root': {
      color: '#000000',
    },
    '& .MuiInputLabel-root': {
      color: '#000000',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#000000',
      },
      '&:hover fieldset': {
        borderColor: '#000000',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000000',
      },
    },
  },
});

const CommonAutocomplete = ({ id, options, label, size, sx, ...props }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        disablePortal
        id={id}
        options={options || []}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            className={classes.textField}
          />
        )}
        size={size || "small"}
        {...props}
      />
    </ThemeProvider>
  );
};

export default CommonAutocomplete;
