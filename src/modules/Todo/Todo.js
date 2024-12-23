import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import PrimaryInput from "../../components/common/inputFields/PrimaryInput";
import PrimaryButton from "../../components/common/buttons/PrimaryButton";
import NoDataSVG from "../../assets/images/NoDataSVG.jpg";
import { todoApiUrls } from "../../api/apiEndpoints";
import "./Style/Todo.scss";

function Todo(props) {
  const BASE_URL = process.env.REACT_APP_API_ENDPOINT_BASE;
  const [addVal, setAddVal] = useState("");
  const [data, setData] = useState([]);

  const getAllList = () => {
    fetch(BASE_URL + todoApiUrls.getList)
      .then((response) => response.json())
      .then((resData) => {
        if (resData.isSuccess) {
          setData(resData.data);
        } else {
          console.log("Error fetching Todo List:", resData.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching Todo List:", error);
      });
  };

  useEffect(() => {
    getAllList();
  }, []);

  const addTodo = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST", // HTTP method
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
      getAllList();
      return result;
    } catch (error) {
      console.error("Error during POST request:", error);
      throw error;
    }
  };

  const handleAddTodo = async () => {
    if (!addVal) {
      alert("Please enter a todo");
      return;
    }
    const data = { description: addVal };
    addTodo(BASE_URL + todoApiUrls.add, data);
    setAddVal("");
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "10px",
      }}
    >
      {data?.length > 0 ? (
        <div
          className="todo-list-layout-in"
          style={{ overflowY: "scroll", paddingBottom: "10px", height:'100%' }}
        >
          <div style={{ width: "99%" }}>
            <TodoList data={data} setData={setData} getAllList={getAllList} />
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "80%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={NoDataSVG} alt="No Data" style={{ height: "100%" }} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
        }}
      >
        <PrimaryInput
          name="addTodo"
          label="Add a new todo"
          value={addVal}
          onChange={(e) => setAddVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <PrimaryButton
          bgColor={"blue"}
          color={"white"}
          value={"Add"}
          onClick={handleAddTodo}
          disabled={!addVal}
        />
      </div>
    </div>
  );
}

export default Todo;
