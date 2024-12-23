import React from "react";
import TodoCard from "./TodoCard";

function TodoList({ data, getAllList }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {data?.length > 0 &&
        data.map((item, index) => <TodoCard item={item} key={item?.id} getAllList={getAllList} />)}
    </div>
  );
}

export default TodoList;
