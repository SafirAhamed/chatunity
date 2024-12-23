import React from "react";
import { Button, useTheme, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme, bgColor, color }) => ({
  backgroundColor: bgColor || theme.palette.common.white,
  color: color || theme.palette.grey[900],
  fontWeight: 600,
  height: "40px",
  
}));

const PrimaryButton = ({ value, bgColor, color, variant, onClick, ...props }) => {
  return (
    <StyledButton
      variant={variant || "contained"}
      bgColor={bgColor}
      color={color}
      onClick={onClick}
      {...props}
    >
      {value}
    </StyledButton>
  );
};

export default PrimaryButton;
