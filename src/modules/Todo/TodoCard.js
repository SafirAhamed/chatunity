import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  createTheme,
  IconButton,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryInput from "../../components/common/inputFields/PrimaryInput";
import { todoApiUrls } from "../../api/apiEndpoints";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const checkboxStyle = {
  "&.Mui-checked": {
    color: "#000000",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "2rem",
  },
};

function TodoCard({ checkVal, item, getAllList }) {
  const BASE_URL = process.env.REACT_APP_API_ENDPOINT_BASE;
  const [isEditing, setIsEditing] = useState(false);
  const [editVal, setEditVal] = useState(item?.description);
  const [isCompleted, setIsCompleted] = useState(item?.isCompleted);

  const updateTodo = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "PUT", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify JSON format
        },
        body: JSON.stringify(data), // Convert the data to JSON format
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json(); // Parse JSON response
      console.log("Response:", result);
      await getAllList();
      return result;
    } catch (error) {
      console.error("Error during POST request:", error);
      throw error;
    }
  };

  const deleteTodo = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "DELETE", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify JSON format
        },
        body: JSON.stringify(data), // Convert the data to JSON format
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json(); // Parse JSON response
      console.log("Response:", result);
      await getAllList();
      return result;
    } catch (error) {
      console.error("Error during POST request:", error);
      throw error;
    }
  };

  const handleChangeCompleted = (e, val) => {
    setIsCompleted(val);
  };
  const handleEdit = () => {
    const data = { id: item.id, description: editVal, isCompleted };
    updateTodo(BASE_URL + todoApiUrls.update, data);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const data = { id: item.id };
    deleteTodo(BASE_URL + todoApiUrls.delete, data);
  };

  useEffect(() => {
    if (isCompleted !== item?.isCompleted) {
      handleEdit();
    }
  }, [isCompleted]);

  return (
    <Paper
      elevation={2}
      sx={{
        padding: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isCompleted ? "#32de84" : "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        <Checkbox
          value={item?.isCompleted}
          onChange={handleChangeCompleted}
          sx={checkboxStyle}
          checkedIcon={
            <CheckCircleOutlineIcon sx={{ fontSize: "2rem", color: "green" }} />
          }
          icon={
            <RadioButtonUncheckedIcon
              sx={{ fontSize: "2rem", color: "gray" }}
            />
          }
          disabled={isEditing}
        />
        {isEditing ? (
          <PrimaryInput
            name="addTodo"
            label="Add a new todo"
            value={editVal}
            onChange={(e) => setEditVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEdit();
              }
              if (e.key === "Escape") {
                setIsEditing(false);
              }
            }}
          />
        ) : (
          <Typography variant="h6">{item?.description}</Typography>
        )}
      </Box>
      {isEditing ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleEdit}>
            <DoneIcon color="success" fontSize="small" />
          </IconButton>
          <IconButton onClick={() => setIsEditing(false)}>
            <CloseIcon color="error" fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon color="action" fontSize="small" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
}

export default TodoCard;
