import React from "react";
import TodoItem from "./TodoItem";
import Accordion from "react-bootstrap/Accordion";

function TodoBoard(props) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header>TodoList</Accordion.Header>
        <Accordion.Body>
          {/* <TodoItem /> */}
          {props.todoList.map((item, i) => (
            <TodoItem key={i} item={item} id={i} onChanged={props.onChecked} />
          ))}
          {/* {props.todoList.map((item, i) => (
        <div key={i}>{item}</div>
      ))} */}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default TodoBoard;
